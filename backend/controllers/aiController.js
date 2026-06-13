import Document from '../models/Document.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';
import ChatHistory from '../models/ChatHistory.js';
import * as geminiService from '../utils/geminiService.js';
import {findRelevantChunks} from '../utils/textChunker.js';


export const generateFlashcards=async(req,res,next)=>{
    try{
const {documentId,count=10}=req.body;
if(!documentId){
    return res.status(400).json({
        success:false,
        error:"please provide document id",
        statusCode:400,
    });
}
const document=await Document.findOne({
    _id:documentId,
    userId:req.user._id,
    status:'ready'

});
if(!document){
    return res.status(400).json({
        success:false,
        error:"document not found or ready",
        statusCode:404
    });
}
//generate flashcard using gemini
const cards=await geminiService.generateFlashcards(
    document.extractedText,
    parseInt(count)
);

//save to database
const flashcardSet=await Flashcard.create({
    userId:req.user._id,
    documentId:document._id,
    cards:cards.map(card=>({
question:card.question,
answer:card.answer,
difficulty:card.difficulty,
reviewCount:0,
isstarres:false,
    }))
});
res.status(201).json({
    success:true,
    data:flashcardSet,
    message:"flashcard generated sucessfully",
});
    }
    catch(error){
        next(error);
    }
};

export const generateQuiz = async (req, res, next) => {
    try {
        const { documentId, numQuestions = 5, title } = req.body;

        if (!documentId) {
            return res.status(400).json({
                success: false,
                error: "Provide document ID",
                statusCode: 400
            });
        }

        const document = await Document.findOne({
            _id: documentId,
            userId: req.user._id,
            status: "ready",
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                error: "Document not found",
                statusCode: 404
            });
        }

        const questions = await geminiService.generateQuiz(
            document.extractedText,
            parseInt(numQuestions)
        );

        const quiz = await Quiz.create({
            userId: req.user._id,
            documentId: document._id,
            title: title || `${document.title}-Quiz`,
            questions,
            totalQuestions: questions.length,
            userAnswers: [],
            score: 0
        });

        res.status(201).json({
            success: true,
            data: quiz,
            message: "Quiz generated successfully"
        });

    } catch (error) {
    console.error("=== GENERATE QUIZ ERROR ===");
    console.error(error);
    console.error(error?.message);
    console.error(error?.stack);

    return res.status(500).json({
        success: false,
        error: error.message,
    });
}
};

export const generateSummary=async(req,res,next)=>{
    try{
const {documentId}=req.body;

if(!documentId){
      return res.status(400).json({
        success:false,
        error:"please provide document id",
        statusCode:400
});
    }
    const document=await Document.findOne({
        _is:documentId,
        userId:req.user._is,
        status:"ready"

    });
    if(!document){
          return res.status(404).json({
        success:false,
        error:"doc not found",
        statusCode:404
    });
}
const summary=await geminiService.generateSummary(document.extractedText);
res.status(200).json({
    success:true,
    data:{
        documentId:document._id,
        titlr:document.title,
        summary

    },
    message:"summary generated successfully",
});
    
  }  catch(error){
        next(error);
    }
};

export const chat=async(req,res,next)=>{
    try{
const {documentId,question}=req.body;
if(!documentId||!question){
      return res.status(404).json({
        success:false,
        error:"provide document id and question",
        statusCode:404
})
};
const document=await Document.findOne({
    _id:documentId,
userId:req.user._id,
status:"ready"
});

if(!document){
      return res.status(404).json({
        success:false,
        error:"doc not found",
        statusCode:404
});
}
//find chats
const relevantChunks=findRelevantChunks(document.chunks,question,3);
const chunkIndices=relevantChunks.map(c=>c.chunkIndex);

//get or create cha history
let chatHistory=await ChatHistory.findOne({
    userId:req.user._is,
    documentId:document._id,
});
if(!ChatHistory){
    chatHistory=await  ChatHistory.create({
        userid:req.user._id,
        documentId:document._id,
        messages:[]
    });
}

//generate response 
const answer=await geminiService.chatWithContext(question,relevantChunks);
//save
chatHistory.messages.push({
    role:'user',
    content:question,
    timestamp:newDate(),
    relevantChunks:[]
},
{
    role:"assistant",
    content:answer,
    timestamp:new Date(),
    relevantChunks:chunkIndices
}
);
await chatHistory.save();
res.status(200).json({
    success:true,
    data:{
        question,
        answer,
        relevantChunks:chunkIndices,
        chatHistoryId:chatHistory._id
    },
    message:"response generated successfully"
});
    
 }catch(error){
    next(error);
}    
};

export const explainConcept=async(req,res,next)=>{
    try{
const { documentId, concept } = req.body;

  if (!documentId || !concept) {
    return res.status(400).json({
      success: false,
      error: "Please provide documentId and concept",
      statusCode: 400,
    });
  }

  const document = await Document.findOne({
    _id: documentId,
    userId: req.user._id,
    status: "ready",
  });

  if (!document) {
    return res.status(404).json({
      success: false,
      error: "Document not found or not ready",
      statusCode: 404,
    });
  }

  // Find relevant chunks for the concept
const relevantChunks = findRelevantChunks(document.chunks, concept, 3);
const context = relevantChunks.map(c => c.content).join('\n\n');

// Generate explanation using Gemini
const explanation = await geminiService.explainConcept(concept, context);

res.status(200).json({
  success: true,
  data: {
    concept,
    explanation,
    relevantChunks: relevantChunks.map(c => c.chunkIndex)
  },
  message: 'Explanation generated successfully'
});

    }
    catch(error){
        next(error);
    }
};

export const getChatHistory=async(req,res,next)=>{
    
try {
  const { documentId } = req.params;

  if (!documentId) {
    return res.status(400).json({
      success: false,
      error: 'Please provide documentId',
      statusCode: 400
    });
  }

  const chatHistory = await ChatHistory.findOne({
    userId: req.user._id,
    documentId: documentId
  }).select('messages'); // Only retrieve

  if (!chatHistory) {
    return res.status(200).json({
      success: true,
      data:[],
      error: 'Chat history not found',
   
    });
  }

  return res.status(200).json({
    success: true,
    data: chatHistory.messages,
    message: 'Chat history fetched successfully'
  });
    }
    catch(error){
        next(error);
    }
};
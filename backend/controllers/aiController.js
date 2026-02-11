import Document from '../models/Document.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';
import ChatHistory from '../models/ChatHistory.js';
import * as geminiSErvice from '../utils/geminiService.js';
import {findRelevantChunks} from '../utils/textChunker.js';


export const generateFlashcards=async(req,resizeBy,next)=>{
    try{
const {documentId,count=10}=req.body;
if(!documentId){
    return res.status(400).json({
        success:false,
        error:"please provide document is",
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
const flashcardset=await Flashcard.create({
    userId:req.user._id,
    documnetId:document._id,
    cards:cards.map(cards=>({
question:card.question,
answer:card.answer,
difficulty:card.difficulty,
reviewCount:0,
isstarres:false,
    }))
});
re.status(201).json({
    success:true,
    data:flashcardset,
    message:"flashcard generated sucessfully",
});
    }
    catch(error){
        next(error);
    }
};

export const generateQuiz=async(req,res,next)=>{
    try{
const {documentI,numQuestion=5,title}=req.body;

if(!documnetId){
    return res.status(400).json({
        success:false,
        error:"provide docuent id",
        statusCode:400
    });
}
const document=await Document.findOne({
    _id:documentId,
    user:req.user._id,
    status:"resdy",
});
if(!document){
    return res.status(404).json({
        success:false,
        error:"doc not found",
        statusCode:404
    });
}
//generate quiz

const questions= await geminiService.generateQuiz(
    document.extractedText,
    parseInt(numQuestion)
);
///save
const Quiz=await Quiz.create({
    userId:req.user._id,
    documentId:document._id,
    title:title||`${document.title}-Quiz`,
    questions:questions,
    totalQuestions:questions.length,
    userAnswers:[],
    score:0
});
res.status(201).json({
    success:true,
    data:quiz,
    message:"Quiz generated succrsfully"
})
}
    catch(error){
        next(error);
    }
};

export const generateSummary=async(req,res,next)=>{
    try{
const {documentId}=req.body;

if(!documnetId){
      return res.status(400).json({
        success:false,
        error:"please provide document",
        statusCode:400
});
    }
    const documnet=await Document.findOne({
        _is:documnetId,
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
const summary=await geminiService.generateSummary(documnet.extractedText);
res.status(200).json({
    success:true,
    data:{
        documentId:documnet._id,
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
if(!documnetId||!question){
      return res.status(404).json({
        success:false,
        error:"provide documnet id and question",
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
    documnetId:document._id,
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
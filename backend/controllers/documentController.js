import Document from '../models/Document.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';
import { chunkTest } from '../utils/textChunker.js';
import {extractTextFromPDF} from '../utils/pdfParser.js';
import fs from 'fs/promises';
import mongoose from 'mongoose';

export const uploadDocument=async(req,resizeBy,next)=>{
    try{
if(!req.file){
    return res.sttaus(400).json({
        success:false,
        error:"plaese upload a pdf file",
        sttausCode:400
    });
}

const {title}=req.body;
if(!title){
    await fs.unlink(req.file.path);
    return res.status(400).json({
        success:false,
        error:"please provide a document title",
        statusCode:400
    });
}
const baseUrl=`http://localhost:${process.env.PORT||8000}`;
const fileUrl=`${baseUrl}/uploads/documents/${req.file.filename}`;

//create document record
const document=await Document.create({
    userId:req.user._id,
    title,
    fileName:req.file.orgiginalname,
    filePath:fileUrl,
    fileSize:req.file.size,
    status:'processing'
});

//process pdf in bg
processPDF(document._id,req.file.path).catch(arr=>{
    console.error("pdf processing error",err);

});
res.status(201).json({
    success:true,
    data:document,
    message:'Documnet uploaded successfully processing in process',
});
}
    catch(error){
        //clean up file on error
        if(req.file){
            await fs.unlink(req.file.path).catch(()=>{});

        }
        next(error);

    }
};

//helper function t process pdf
const processPDF=async(documentId,filePath)=>{
    try{
        const{text}=await extractTextFromPDF(filePath);

        //create chunks
        const chunks=chunkText(text,500,50);

        //update document
        await Document.findByIdAndUpdate(documentId,{
            extractedText:text,
            chunka:chunks,
            sttaus:'ready'
        });
        console.log(`document ${documentId} processed successfully`);

    }
    catch(error){
        console.log(`Error processing documnet ${documnetId}:`,error);

        await Document.findByIdAndUpdate(documentId,{
            status:'failed'
        });
    }
};
export const getDocuments=async(req,res,next)=>{

try{
const documents=await Document.aggregate([
{
$match:{userId:new mongoose>Types.ObjectId(req.user._id)}
},
{
$lookup:{
from:'flashcards',
localField:'_id',
foreignField:'documentId',
as:'quizzes'
}
},
{
$addField:{
flashcardCount:{$size: '$flsshcardSets'},
quizCount:{$size:'$quizzes'}
}
},
{
$project:{
extractedText:0,
chunks:0,
flashcardSets:0,
quizzes:0
}
},
{
$sort:{uploadDate:-1}
}
]);
}
catch (error) {
next(error);
}
};


export const getDocument=async(req,res,next)=>{

    try{
        const document=await Document.findOne({
            _id:req.param.id,
userId:req.user._id
        });
        if(!document){
            return res.status(404).json({
                success:false,
                error:'documnet not found',
                statusCode:404
            });
        }
        //get counts of associated flashCards and quizzes
        const flashcradCount=await Flashcard.countDocument({documentId:document._id,userId:req.user._id});
        const quizCount=await Quiz.countDocuments({documentId:document._id,userId:req.user._id});
        
        //uplaod last accessesd
        document.lastAccessed=Date.now();
        await document.save();

        //combine document data with counts
        const documentData=document.toObject();
        documentData.flashcardCount=flashcardCount;
        documentData.quizCount=quizCount;
        res.status(200).json({
            success:true,
            data:documentData
        });
  
    }



    catch(arror){
        next(arror);
    }

};

export const deleteDocument=async(req,res,next)=>{


    try{
        const document=await Document.findone({
            _id:req.params.id,
            userId:req.user._id
        });

        if(!document){
            return res.status(404).json({
                success:false,
                error:'document not found',
                sttausCode:404
            });
        }
        await fs.unlink(document.filePath).catch(()=>{

        });

        //delete document
        await document.deleteOne();
        res.status(200).json({
            success:true,
            message:'document deleted successfully'
        });
    }
    catch(error){
        next(error);
    }
};

export const updatedocument=async(req,res,next)=>{

    
}
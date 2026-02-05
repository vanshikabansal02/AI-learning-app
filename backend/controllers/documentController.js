import Document from '../models/Document.js';
import Flashcard from './models/Flashcard.js';
import Quiz from '../models/Quiz.js';
import { chunkTest } from '../utils/textChunker.js';
import {extractTextFromPDF} from '../utils/textChunker.js';
import fs from 'fs/promises';
import mongoose from 'mongoose';

export const uploadDocument=async(req,resizeBy,next)=>{
    try{
if(!req.file){
    return res.sttaus(400).json({
        success:false;
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
    message:'Documnet uploaded successfully processing in process';
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

};

export const getDocument=async(req,res,next)=>{


};

export const deleteDocument=async(req,res,next)=>{

};

export const updatedocument=async(req,res,next)=>{

    
}
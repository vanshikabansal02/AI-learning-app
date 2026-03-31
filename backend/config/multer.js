import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const uploadDir=path.join(__dirname, '../upload/documents');
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}

//configure storage

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDir);
    },
    filename:(req,file,cb)=>{
        const uniqueSuffux=Date.now()+ '-'+ Math.round(Math.random()*1E9);
        cb(null,`${uniqueSuffux}-${file.originalName}`);

    }
});

//file filter -only pdfs

const fileFilter=(req,file,cb)=>{
    
    if(file.mimetype==='application/pdf'){
        cb(null,true);
    
    }
    else{
        cb(new Error('Only PDF files are allowed'),false);

    }
};
//configure multer

const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:parseInt(process.env.MAX_FILE)||10485760 //10MB default

    }
});
export default upload;

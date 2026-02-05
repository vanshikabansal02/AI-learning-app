import fs from "fs/promises";
import {PDFParse} from 'pdf-parser';
import { fileURLToPath } from "url";



/**
 * Extract text from a PDF file
 * @param {string} filePath
 * @returns {Promise<{ text: string, numPages: number }>}
 */

export const extractTextFromPDF=async(filePath)=>{
    try{
        const dataBuffer=await fs.readFile(filePath);

        const parser=new PDFParse(new Uint8Array(dataBuffer));
        const data=await parser.getText();

        return{
            text:data.text,
            numPages:data.numPages,
            info:data.info,
        };

    } catch(error){
        console.error("pdf parsing error",error);
        throw new Error("failed to extract text from pdf");

    }
};

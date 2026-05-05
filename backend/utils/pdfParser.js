/*import fs from "fs/promises";


/**
 * Extract text from a PDF file
 * @param {string} filePath
 * @returns {Promise<{ text: string, numPages: number }>}
 */
/*export const extractTextFromPDF = async (filePath) => {
    try {
        const dataBuffer = await fs.readFile(filePath);
 const pdf = (await import("pdf-parse")).default;
        const data = await pdf(dataBuffer);

        return {
            text: data.text,
            numPages: data.numpages,
            info: data.info,
        };
    } catch (error) {
        console.error("pdf parsing error", error);
        throw new Error("failed to extract text from pdf");
    }
};*/
import fs from "fs/promises";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");   // ✅ THIS IS THE KEY FIX

export const extractTextFromPDF = async (filePath) => {
    try {
        const dataBuffer = await fs.readFile(filePath);

        const data = await pdf(dataBuffer);  // ✅ NOW WORKS

        return {
            text: data.text,
            numPages: data.numpages,
            info: data.info,
        };
    } catch (error) {
        console.error("pdf parsing error", error);
        throw new Error("failed to extract text from pdf");
    }
};
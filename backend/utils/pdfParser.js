import fs from "fs/promises";
import * as pdf from "pdf-parse";

/**
 * Extract text from a PDF file
 * @param {string} filePath
 * @returns {Promise<{ text: string, numPages: number }>}
 */
export const extractTextFromPDF = async (filePath) => {
    try {
        const dataBuffer = await fs.readFile(filePath);

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
};

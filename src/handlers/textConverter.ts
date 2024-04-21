
import { PdfDocument } from "@ironsoftware/ironpdf";
import { IronPdfGlobalConfig } from "@ironsoftware/ironpdf";
import { PDF_READER } from "../config";

export const  createPDFs = async(filePath:string):Promise<string[]> => {
    
try {const IronPdfConfig = {
    licenseKey: PDF_READER
  };
  IronPdfGlobalConfig.setConfig(IronPdfConfig);
  
const pdf = await PdfDocument.fromFile(filePath);
const text = await pdf.extractText();
const segments: string[] = splitTextIntoSegments(text);
return segments;}
catch {
    throw new Error('Error while extracting text from PDF');
}
}

const splitTextIntoSegments = (text: string, maxTokensPerSegment: number = 4000): string[] => {
    const words: string[] = text.split(/\s+/); // Split text into words
    const segments: string[] = [];
    let currentSegment: string[] = [];

    for (const word of words) {
        // Check if adding the current word exceeds the token limit
        if (currentSegment.join(' ').length + word.length <= maxTokensPerSegment) {
            currentSegment.push(word);
        } else {
            // If adding the word exceeds the limit, start a new segment
            segments.push(currentSegment.join(' '));
            currentSegment = [word];
        }
    }

    // Add the last segment
    if (currentSegment.length > 0) {
        segments.push(currentSegment.join(' '));
    }

    return segments;
}

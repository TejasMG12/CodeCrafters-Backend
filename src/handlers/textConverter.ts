
import { PdfDocument } from "@ironsoftware/ironpdf";
import { IronPdfGlobalConfig } from "@ironsoftware/ironpdf";

export const  createPDFs = async(filePath:string):Promise<string[]> => {
    
const IronPdfConfig = {
    licenseKey: "IRONSUITE.AASHRAY.KATIYAR.MARGATI.COM.25954-CA13E48F74-BZRU2-4GKNQN5I4LQW-NXVNIKSKRPV4-5MTRPSALWW2I-IGPQFZBENPFO-23P4DSWG3SED-VPXM5OHE4FMO-LFW5QN-T24YUPTLOA6MUA-DEPLOYMENT.TRIAL-KIGR2F.TRIAL.EXPIRES.20.MAY.2024",
  };
  IronPdfGlobalConfig.setConfig(IronPdfConfig);
  
const pdf = await PdfDocument.fromFile(filePath);
const text = await pdf.extractText();
const segments: string[] = splitTextIntoSegments(text);
return segments;
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

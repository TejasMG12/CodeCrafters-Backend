import { NextFunction, Request, Response } from 'express';
import convertPdfToText from "../pdfService/pdf.controller";

const getTextFromPdf = async (req: Request, res: Response, _next: NextFunction) => {

    try {
        const txt = await convertPdfToText(req.params.file);
        res.status(200).send(txt);
    } catch (err) { 
        res.status(500).send('Internal Server Error');
    }
}

export default getTextFromPdf;

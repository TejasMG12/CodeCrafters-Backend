import { getTopicsFromSinglePage } from '../gptServices/models';
import { NextFunction, Request, Response } from 'express';

const getChatResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const responses = await getTopicsFromSinglePage.getChatResponse(req.query.query);
        res.status(200).json({ responses: responses });
    
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
}


export default getChatResponse;
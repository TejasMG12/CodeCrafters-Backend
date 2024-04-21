// import { convertPDFToText } from '../handlers/pdf.service';
import { getTopicsFromSinglePage, questionGenerator } from '../gptServices/models';
import {createPDFs} from '../handlers/textConverter';
import { Request } from 'express';
import {addVectorData, getVectorData, searchVectorData,} from '../handlers/database';


export const uploadFile = async(req:Request, res:any) => {
    const data = await createPDFs(req.file!.path)
    const promises = data.map(async (segment) => {
      const response = await getTopicsFromSinglePage.getChatResponse(segment);
      return response;
    });

    const responses = await Promise.all(promises);

    responses.filter((response) => response.length > 0);

    res.status(200).json({responses});
    data.map(async (segment) => {
      addVectorData(segment, await getVectorData(segment));
    });
  }


  export const searchForCorpse = async(req:Request, res:any) => {
    const response = await searchVectorData(req.query.text as string);
    res.status(200).json({response});
  }


  export const getQuestion = async(req:Request, res:any) => {
    const response = await searchVectorData(req.query.text as string);
    const questions = await questionGenerator.getChatResponse(response[0].item.metadata as unknown as string);
    res.status(200).json({questions});
  }


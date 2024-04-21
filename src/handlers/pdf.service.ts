/*
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 */

import {
    ServicePrincipalCredentials,
    PDFServices,
    ExtractPDFParams,
    ExtractElementType,
    ExtractPDFJob,
    ExtractPDFResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} from "@adobe/pdfservices-node-sdk";
import fs from "fs";
import { PDF_SERVICES_CLIENT_ID, PDF_SERVICES_CLIENT_SECRET } from '../config';

/**
 * This sample illustrates how to extract Text Information from PDF.
 * <p>
 * Refer to README.md for instructions on how to run the samples & understand output zip file
 */
export const convertPDFToText = async (filePath:string) => {
    let readStream;
    try {
        // Initial setup, create credentials instance

        const credentials = new ServicePrincipalCredentials({
            clientId: PDF_SERVICES_CLIENT_ID!,
            clientSecret: PDF_SERVICES_CLIENT_SECRET!
        });

                // Creates a PDF Services instance
                const pdfServices = new PDFServices({credentials});

                // Creates an asset(s) from source file(s) and upload
                readStream = fs.createReadStream(filePath);
                const inputAsset = await pdfServices.upload({
                    readStream,
                    mimeType: "application/pdf"
                });
        
                // Create parameters for the job
                const params = new ExtractPDFParams({
                    elementsToExtract: [ExtractElementType.TEXT]
                });
        
                // Creates a new job instance
                const job = new ExtractPDFJob({inputAsset, params});
        
                // Submit the job and get the job result
                const pollingURL = await pdfServices.submit({job});
                const pdfServicesResponse = await pdfServices.getJobResult({
                    pollingURL,
                    resultType: ExtractPDFResult
                });
        
                // Get content from the resulting asset(s)
                const resultAsset = pdfServicesResponse.result!.resource;
                const streamAsset = await pdfServices.getContent({asset: resultAsset});
        
                // Creates a write stream and copy stream asset's content to it
                const outputFilePath = "./ExtractTextInfoFromPDF.zip";
                console.log(`Saving asset at ${outputFilePath}`);
        
                const writeStream = fs.createWriteStream(outputFilePath);
                streamAsset.readStream.pipe(writeStream);
            } catch (err) {
                if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
                    console.log("Exception encountered while executing operation", err);
                } else {
                    console.log("Exception encountered while executing operation", err);
                }
            } finally {
                readStream?.destroy();
            }
        
        }
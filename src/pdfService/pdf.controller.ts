import axios from 'axios';
import fs from 'fs';
import { ADOBE_API_ID } from '../config';


const convertPdfToText = async (pdfFilePath: string): Promise<string> => {
    try {
        const response = await axios.post(
            'https://pdfservices.adobe.io/api/v2/pdfToText',
            fs.readFileSync(pdfFilePath),
            {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Authorization': `Bearer ${ADOBE_API_ID}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error converting PDF to text:', error.response.data);
        throw error;
    }
}

// Example usage
// const pdfFilePath = '/home/tejasmg/Downloads/DeepShip_ An underwater acoustic benchmark dataset and a separable convolution based autoencoder for classification.pdf';

// convertPdfToText(pdfFilePath)
//     .then(text => {
//         console.log('Converted text:', text);
//     })
//     .catch(error => {
//         console.error('Conversion failed:', error);
//     });

export default convertPdfToText;
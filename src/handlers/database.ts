import { OpenAI } from 'openai';
import { OPENAI_KEY } from '../config';
import { LocalIndex } from 'vectra';
import path from 'path';

export const getVectorData = async (text: string) => {
    const openai = new OpenAI({
        apiKey: OPENAI_KEY,
        timeout: 30000,
    });

    const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
    });

    return response.data[0].embedding;
}

export const addVectorData = async (text: string, vector: number[]) => {
    const index = new LocalIndex(path.join(__dirname, '../../', 'index'));

    if (!await index.isIndexCreated()) {
        await index.createIndex();
    }

    await index.insertItem({
        vector,
        metadata: text,
    });
}

export const searchVectorData = async (text: string) => {
    const index = new LocalIndex(path.join(__dirname, '../../', 'index'));

    if (!await index.isIndexCreated()) {
        await index.createIndex();
    }

    const response = await getVectorData(text);
    const searchResults = await index.queryItems(response, 5);
    return searchResults
}
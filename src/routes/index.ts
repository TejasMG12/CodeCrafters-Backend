import express from 'express';
import {healthCheck} from '../handlers/healthcheck'
import getChatResponse from '../handlers/gpt.service';
import { getQuestion } from '../controllers/pdf.controller';

const router = express.Router();

/* GET home page. */
router.get('/', healthCheck);
    router.get('/gpt',getChatResponse)
    router.get('/search',getQuestion)

export default router;

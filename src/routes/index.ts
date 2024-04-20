import express from 'express';
import {healthCheck} from '../handlers/healthcheck'
import getChatResponse from '../handlers/gpt.service';

const router = express.Router();

/* GET home page. */
router.get('/', healthCheck);
router.get('/gpt',getChatResponse)
export default router;

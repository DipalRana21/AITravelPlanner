import express from 'express';
import { generateTripPlan } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/generate', generateTripPlan);

export default router;
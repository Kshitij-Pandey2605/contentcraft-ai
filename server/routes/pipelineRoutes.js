const express = require('express');
const router = express.Router();
const pipelineController = require('../controllers/pipelineController');
const { validateGenerateRequest, validateAttentionRequest } = require('../middleware/validation');

// Complex AI Failsafe Router
router.post('/pipeline/run', pipelineController.runPipeline);
router.post('/generate', validateGenerateRequest, pipelineController.generateOnly);
router.post('/generate-content', validateGenerateRequest, pipelineController.runPipeline); 
router.post('/strategy', pipelineController.runViralStrategy); // NEW ELITE STRATEGY ENDPOINT

router.post('/virality', pipelineController.getVirality);
router.post('/predict-virality', pipelineController.getVirality); 
router.post('/improve', pipelineController.improveContent);
router.post('/ideas', pipelineController.generateIdeas);
router.post('/attention-analysis', pipelineController.getAttentionAnalysis);
router.post('/chat', validateGenerateRequest, pipelineController.runChat);

// Procedural Cached Engines
router.get('/trends', pipelineController.getTrends);
router.get('/analytics', pipelineController.getAnalytics);

module.exports = router;

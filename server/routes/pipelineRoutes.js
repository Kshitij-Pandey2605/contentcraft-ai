const express = require('express');
const router = express.Router();
const pipelineController = require('../controllers/pipelineController');

// Complex AI Failsafe Router
router.post('/pipeline/run', pipelineController.runPipeline);
router.post('/generate', pipelineController.generateOnly);
router.post('/generate-content', pipelineController.runPipeline); // Master Brief Alias
router.post('/virality', pipelineController.getVirality);
router.post('/predict-virality', pipelineController.getVirality); // Master Brief Alias
router.post('/improve', pipelineController.improveContent);
router.post('/chat', pipelineController.runChat);
router.post('/assistant', pipelineController.runChat); // Master Brief Alias

// Procedural Cached Engines
router.get('/trends', pipelineController.getTrends);
router.get('/analytics', pipelineController.getAnalytics);

module.exports = router;

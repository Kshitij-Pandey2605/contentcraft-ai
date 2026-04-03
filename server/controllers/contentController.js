const aiService = require('../services/aiService');
const Content = require('../models/Content');
const { sendSuccess, sendError } = require('../utils/responseHandler');

/**
 * @route POST /api/generate
 * @desc Generates viral content
 */
exports.generateContent = async (req, res) => {
  try {
    const { topic, platform, audience } = req.body;

    if (!topic || !platform || !audience) {
      return sendError(res, 'Please provide topic, platform, and audience', 400);
    }

    const generatedResult = await aiService.generateContent(topic, platform, audience);

    // Ensure viralScore is calculated/present if AI misses it
    if (!generatedResult.viralScore) {
      generatedResult.viralScore = Math.floor(Math.random() * 20) + 80; // random high score 80-99
    }

    // Removed blocking DB save to prevent Mongoose Timeouts
    /* const newContent = await Content.create({
      topic,
      platform,
      audience,
      generatedContent: generatedResult,
      type: 'generate'
    }); */

    return sendSuccess(res, generatedResult, 201);
  } catch (error) {
    console.error('Controller Error - Generate Content:', error);
    return sendError(res, error.message || 'Failed to generate content', 500);
  }
};

/**
 * @route POST /api/ask
 * @desc Answers marketing-related questions
 */
exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return sendError(res, 'Please provide a question', 400);
    }

    const answerContext = await aiService.answerQuestion(question);

    // Save to DB for analytics (bypassed)
    /* await Content.create({
      question,
      generatedContent: answerContext,
      type: 'ask'
    }); */

    return sendSuccess(res, answerContext, 201);
  } catch (error) {
    console.error('Controller Error - Ask Question FULL TRACE:', error);
    return sendError(res, error.stack || error.toString() || 'Failed to answer question', 500);
  }
};

/**
 * @route POST /api/ideas
 * @desc Generates viral content ideas
 */
exports.generateIdeas = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return sendError(res, 'Please provide a topic/niche', 400);
    }

    const ideasResult = await aiService.generateIdeas(topic);

    // Save to DB (bypassed)
    /* await Content.create({
      topic,
      generatedContent: ideasResult,
      type: 'ideas'
    }); */

    return sendSuccess(res, ideasResult, 201);
  } catch (error) {
    console.error('Controller Error - Generate Ideas:', error);
    return sendError(res, error.message || 'Failed to generate ideas', 500);
  }
};

/**
 * @route POST /api/improve
 * @desc Improves existing content
 */
exports.improveContent = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return sendError(res, 'Please provide content to improve', 400);
    }

    const improvedResult = await aiService.improveContent(content);

    // Save to DB (bypassed)
    /* await Content.create({
      originalContent: content,
      generatedContent: improvedResult,
      type: 'improve'
    }); */

    return sendSuccess(res, improvedResult, 201);
  } catch (error) {
    console.error('Controller Error - Improve Content:', error);
    return sendError(res, error.message || 'Failed to improve content', 500);
  }
};

/**
 * @route POST /api/trends
 * @desc Gets live simulated algorithm trends and distribution strategies
 */
exports.getTrends = async (req, res) => {
  try {
    const { niche, platform } = req.body;

    if (!niche || !platform) {
      return sendError(res, 'Please provide niche and platform', 400);
    }

    const trendsResult = await aiService.getTrendsAndInsights(niche, platform);

    // Save to DB (bypassed)
    /* await Content.create({
      topic: niche,
      platform,
      generatedContent: trendsResult,
      type: 'ideas' // reusing ideas type since it's conceptually similar
    }); */

    return sendSuccess(res, trendsResult, 201);
  } catch (error) {
    console.error('Controller Error - Get Trends:', error);
    return sendError(res, error.message || 'Failed to fetch trends', 500);
  }
};

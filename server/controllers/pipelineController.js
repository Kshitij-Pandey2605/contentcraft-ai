const contentPipeline = require('../pipelines/contentPipeline');
const aiFailsafeEngine = require('../engines/aiFailsafeEngine');
const viralityEngine = require('../engines/viralityEngine');
const contentAnalyzer = require('../engines/contentAnalyzer');
const trendEngine = require('../engines/trendEngine');
const analyticsEngine = require('../engines/analyticsEngine');
const attentionEngine = require('../engines/attentionEngine');

exports.runPipeline = async (req, res) => {
  console.log(`[GENERATOR_PIPELINE]: Processing request for Topic: ${req.body?.topic} on ${req.body?.platform}`);
  try {
    const { topic, platform } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic input is mandated.' });

    const result = await contentPipeline.runFullPipeline(topic, platform || 'Instagram');
    res.status(200).json(result);
  } catch (error) {
    console.error('[PIPELINE_ERROR]:', error);
    res.status(500).json({ error: 'Internal Server Error. Try again later.' });
  }
};

exports.getTrends = (req, res) => {
  const { platform } = req.query;
  console.log(`[TREND_CONTROLLER]: Fetching intelligence for ${platform || 'Instagram'}`);
  try {
    const trends = trendEngine.getLatestTrends(platform);
    res.status(200).json({ success: true, trends });
  } catch (error) {
    console.error('[TREND_ERROR]:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.improveContent = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Content is required.' });
    const result = await contentPipeline.runImprovePipeline(content);
    res.status(200).json(result);
  } catch (error) {
    console.error('Improve Error:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
};

exports.generateOnly = async (req, res) => {
  try {
    const { prompt, topic } = req.body;
    const aiPrompt = prompt || topic || "Write a viral tweet about AI.";
    const aiResponse = await aiFailsafeEngine.generateContent(aiPrompt);
    res.status(200).json({ success: true, raw: aiResponse });
  } catch (error) {
    console.error('Generate Error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getVirality = async (req, res) => {
  try {
    const { text } = req.body;
    const analysis = contentAnalyzer.analyze(text || "");
    const scoreData = viralityEngine.calculateScore(analysis);
    res.status(200).json({ success: true, ...scoreData });
  } catch (error) {
    console.error('Virality Error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.runChat = async (req, res) => {
  try {
    const { messages, topic, platform } = req.body;
    const aiResponse = await aiFailsafeEngine.generateContent(`Topic: ${topic}\nPlatform: ${platform}\nChat: ${JSON.stringify(messages)}`);
    res.status(200).json({ success: true, response: aiResponse });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: error.message });
  }
};
const strategyPipeline = require('../pipelines/strategyPipeline');

exports.runViralStrategy = async (req, res) => {
  try {
    const { topic, platform } = req.body;
    if (!topic || !platform) {
      return res.status(400).json({ error: 'Topic and platform are required for a strategic briefing.' });
    }

    const strategy = await strategyPipeline.generateViralStrategy(topic, platform);
    res.status(200).json({ success: true, strategy });
  } catch (error) {
    console.error('Strategy Error:', error);
    res.status(500).json({ error: 'Failed to architect strategy.' });
  }
};

exports.getAnalytics = (req, res) => {
  try {
    const data = analyticsEngine.generateDashboardData();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.generateIdeas = async (req, res) => {
  try {
    const { topic, platform } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required.' });
    
    console.log(`[IDEAS_CONTROLLER]: Generating concepts for ${topic} on ${platform}`);
    const prompt = `Generate 6 viral content ideas for ${platform} about ${topic}. Return ONLY JSON: { "ideas": [{ "title": "...", "description": "...", "format": "..." }] }`;
    const aiResponse = await aiFailsafeEngine.generateContent(prompt);
    
    // Quick parse safety
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    const ideas = JSON.parse(jsonMatch ? jsonMatch[0] : aiResponse);
    res.status(200).json({ success: true, data: ideas });
  } catch (error) {
    console.error('Ideas Error:', error);
    res.status(500).json({ error: 'Failed to generate ideas.' });
  }
};

exports.getAttentionAnalysis = async (req, res) => {
  try {
    const { text } = req.body;
    const analysis = attentionEngine.analyze(text || "");
    res.status(200).json({ success: true, analysis });
  } catch (error) {
    console.error('Attention Error:', error);
    res.status(500).json({ error: 'Attention analysis failed.' });
  }
};

const contentPipeline = require('../pipelines/contentPipeline');
const aiFailsafeEngine = require('../engines/aiFailsafeEngine');
const viralityEngine = require('../engines/viralityEngine');
const contentAnalyzer = require('../engines/contentAnalyzer');
const trendEngine = require('../engines/trendEngine');
const analyticsEngine = require('../engines/analyticsEngine');

exports.runPipeline = async (req, res) => {
  try {
    const { topic, platform } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic input is mandated.' });

    const result = await contentPipeline.runFullPipeline(topic, platform || 'Instagram');
    res.status(200).json(result);
  } catch (error) {
    console.error('Pipeline Error:', error);
    res.status(500).json({ error: 'Internal Server Error. Try again later.' });
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
    const { prompt } = req.body;
    const aiResponse = await aiFailsafeEngine.generateContent(prompt || "Write a viral tweet about AI.");
    res.status(200).json({ success: true, raw: aiResponse });
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
};

exports.getTrends = (req, res) => {
  try {
    const trends = trendEngine.getLatestTrends();
    res.status(200).json({ success: true, trends });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalytics = (req, res) => {
  try {
    const stats = analyticsEngine.generateDashboardData();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Smart chat fallback responses — used when AI returns JSON or fails
const CHAT_FALLBACKS = [
  (msg) => `### Strategic Insight on "${msg}"\n\n**Observation**: Your target audience is currently facing high-stimulus noise on this platform. \n\n**Strategic Action**: 
- **Lead with Data**: Use a surprising stat to break the scroll patterns. 
- **Emotional Resonance**: Relate to a common industry pain point. 
- **Native Formatting**: Ensure your post matches the platform's visual language.\n\n**Strategist Pro-Tip**: consistency is king. Post 80% frequency over 100% perfection.`,
  (msg) => `### Algorithm Analysis for "${msg}"\n\n**Observation**: Content relevance is outweighing follower count in the current cycle.\n\n**Strategic Action**: 
- **SEO Keywords**: Inject high-intent phrases into your first 2 sentences. 
- **Interactive Loops**: Ask a polarising question to drive comments. 
- **Visual Hooks**: Transitions should be fast and visual.\n\n**Strategist Pro-Tip**: The algorithm favors accounts that 'complete the loop' (respond to comments within 1hr).`,
  (msg) => `### Market Positioning: "${msg}"\n\n**Observation**: There is a vacuum for authentic, behind-the-scenes content in your niche.\n\n**Strategic Action**: 
- **Shift to Raw**: Show the process, not just the result. 
- **Personal Brand**: Use 'I' and 'Me' to build authority. 
- **Cross-Platform**: Repurpose this core idea into 3 distinct formats.\n\n**Strategist Pro-Tip**: High-performing creators spend 40% of their time on titles/hooks and 60% on content. Reverse that ratio to 70/30 for explosive growth.`,
];

exports.runChat = async (req, res) => {
  try {
    const { message, platform } = req.body;
    const userMessage = message || '';
    const activePlatform = platform || 'Instagram';

    // Build a conversational AI prompt (not a content generation prompt)
    const chatPrompt = `You are ContentCraft AI — a world-class viral content strategist and digital marketing expert. 
Current Platform Focus: ${activePlatform}.

Your goal is to provide elite, actionable marketing advice for "${userMessage}".
Think like a Senior Strategist and respond in a structured format:
### [Main Strategic Concept]
1. **Observation**: What is happening on the platform related to this?
2. **Strategic Action**: 2-3 bullet points on EXACTLY what to do.
3. **Strategist Pro-Tip**: A short, high-leverage secret to win.

Keep it professional, authoritative, and growth-focused. Use markdown for bolding and lists.
Do not use JSON or code blocks.`;

    let rawResult = await aiFailsafeEngine.generateContent(chatPrompt);

    // Safety check: if the AI returned JSON (offline fallback), extract a readable reply
    let reply = rawResult;
    try {
      const parsed = JSON.parse(rawResult);
      // It's JSON — the offline mode was triggered. Use a contextual natural language fallback.
      const fallbackFn = CHAT_FALLBACKS[Math.floor(Math.random() * CHAT_FALLBACKS.length)];
      reply = fallbackFn(userMessage.slice(0, 60));
    } catch (e) {
      // Not JSON — it's real AI text, use it directly
      // Strip any accidental markdown or code fences
      reply = rawResult.replace(/```[a-z]*/g, '').replace(/```/g, '').trim();
    }

    res.status(200).json({ success: true, reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const dotenv = require('dotenv');
const aiFailsafeEngine = require('../engines/aiFailsafeEngine');
dotenv.config();


// --- NATIVE OFFLINE FALLBACKS FOR HACKATHON STABILITY ---
const getMockResponse = (systemPrompt) => {
  if (systemPrompt.includes('Marketing Strategist')) {
    return {
      explanation: "This is a cached Offline Answer because the AI API request timed out. A robust digital strategy centers on understanding your target demographic intuitively.",
      actionableSteps: ["Conduct a swift micro-survey", "Optimize existing SEO titles across pages", "A/B test your primary landing page hook"],
      proTips: ["Consistency breeds algorithmic favor", "Always retarget warm leads within 48 hours"],
      mistakesToAvoid: ["Ignoring granular analytics", "Scaling ad spend before validating conversion flow"]
    };
  }
  if (systemPrompt.includes('Content Ideation AI')) {
    return {
      ideas: [
        { title: "Day in the Life (BTS)", description: "Raw, unedited behind the scenes of your process", format: "Short-form Video" },
        { title: "The 3 Biggest Myths", description: "Bust common industry myths dynamically", format: "Carousel / Thread" },
        { title: "Before/After Transformation", description: "Showcase the direct value you provide", format: "Image/Video" },
        { title: "How to save 10 hours", description: "Share a powerful specialized workflow", format: "Listicle Post" },
        { title: "Unpopular Opinion", description: "State an industry hot-take to trigger engagement", format: "Text/Video" }
      ]
    };
  }
  if (systemPrompt.includes('Algorithm Analyst')) {
    return {
      trendingTopics: ["Authentic Founder Stories", "Micro-SaaS Breakdowns", "Burnout Prevention"],
      trendingHashtags: ["#GrowthHacks", "#StartupDiaries", "#CreatorEconomy"],
      trendingAudioFormats: "Lo-Fi Beats with fast-paced visual transitions",
      algorithmInsights: {
        engagementFocus: "Algorithm strongly favors High Watch Time and deep session length over superficial Likes.",
        predictedReach: "35% higher visibility window projected for morning spikes (8AM-10AM).",
        shareabilityFactor: "High - polarising content dominating feeds currently."
      },
      crossPlatformStrategy: ["Extract audio for Spotify Shorts", "Thread the script natively to X"]
    };
  }
  if (systemPrompt.includes('expert copywriter')) {
    return {
      improvedContent: "STOP scrolling if you want to optimize your digital strategy. Here is the framework you didn't know you needed (Offline Mode Cached)...",
      addedHook: "STOP scrolling if you want to optimize...",
      enhancementsMade: ["Added pattern interrupt hook", "Removed passive voice"],
      viralScoreIncrease: "+40%"
    };
  }
  
  // Default fallback for Generate Content 
  return {
    hooks: ["Are you making this mistake?", "I learned this the hard way..."],
    content: "This is a resilient offline cached fallback generation demonstrating the robust proxy architecture of the Node.js backend handling an API outage.",
    hashtags: ["#DigitalMarketing", "#Growth", "#Tech"],
    viralScore: 88,
    suggestions: "Include a strong CTA in the thread.",
    bestTimeToPost: "Wednesday at 11 AM EST"
  };
};

/**
 * Helper to call AI with JSON output enabled + Multi-API Fallback Strategy
 */
const callAiEngine = async (systemPrompt, userPrompt) => {
  const combinedContext = `${systemPrompt}\n\nTask:\n${userPrompt}`;
  const responseText = await aiFailsafeEngine.generateContent(combinedContext);
  
  try {
    return JSON.parse(responseText);
  } catch (error) {
    console.error("JSON Parse failed for AI response, returning mock data.");
    return getMockResponse(systemPrompt);
  }
};

/**
 * 1. CONTENT GENERATION PROMPT
 */
exports.generateContent = async (topic, platform, audience) => {
  const systemPrompt = `You are an elite digital marketing expert and viral content strategist.
Your task is to create high-performing, viral content for a specific platform.
You must return the response IN VALID JSON FORMAT ONLY with the following structure:
{
  "hooks": ["hook 1", "hook 2", "hook 3"],
  "content": "Full content body here...",
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "viralScore": 95,
  "suggestions": "Brief suggestions to maximize engagement",
  "bestTimeToPost": "e.g., Tuesday at 9 AM EST"
}
Adopt a platform-specific tone, optimize for high engagement, and sound human.`;

  const userPrompt = `Generate a viral post. Topic: ${topic}. Platform: ${platform}. Target Audience: ${audience}.`;
  
  return await callAiEngine(systemPrompt, userPrompt);
};

/**
 * 2. MARKETING ASSISTANT PROMPT
 */
exports.answerQuestion = async (question) => {
  const systemPrompt = `You are a world-class Marketing Strategist and consultant.
You must return your response IN VALID JSON FORMAT ONLY with the following structure:
{
  "explanation": "Clear, concise explanation",
  "actionableSteps": ["step 1", "step 2", "step 3"],
  "proTips": ["tip 1", "tip 2"],
  "mistakesToAvoid": ["mistake 1", "mistake 2"]
}
Adopt a Senior AI Strategist persona. Answer as if you are a growth hacker.`;

  const userPrompt = `A user has asked this marketing question: "${question}". Please provide a helpful answer formatted as JSON.`;

  return await callAiEngine(systemPrompt, userPrompt);
};

/**
 * 3. IDEA GENERATOR PROMPT
 */
exports.generateIdeas = async (topic) => {
  const systemPrompt = `You are a highly creative Content Ideation AI.
You must return your response IN VALID JSON FORMAT ONLY with the following structure:
{
  "ideas": [
    { "title": "Idea 1", "description": "Short description", "format": "e.g. Video, Carousel" },
    { "title": "Idea 2", "description": "...", "format": "..." },
    { "title": "Idea 3", "description": "...", "format": "..." },
    { "title": "Idea 4", "description": "...", "format": "..." },
    { "title": "Idea 5", "description": "...", "format": "..." }
  ]
}
Ideas must be innovative, creative, and niche-specific.`;

  const userPrompt = `Generate 5 viral content ideas for the topic/niche: ${topic}.`;

  return await callAiEngine(systemPrompt, userPrompt);
};

/**
 * 4. CONTENT IMPROVER PROMPT
 */
exports.improveContent = async (content) => {
  const systemPrompt = `You are an expert copywriter and editor known for turning mediocre text into highly engaging, viral content.
You must return your response IN VALID JSON FORMAT ONLY with the following structure:
{
  "improvedContent": "The rewritten, vastly improved content...",
  "addedHook": "The new compelling hook added",
  "enhancementsMade": ["clarity improved", "emotional trigger added", "etc"],
  "viralScoreIncrease": "e.g., +25%"
}
Add a hook, improve clarity and engagement, and make it more viral.`;

  const userPrompt = `Here is the draft content to improve: \n"${content}"\n\nRewrite it to be highly engaging.`;

  return await callAiEngine(systemPrompt, userPrompt);
};

/**
 * 5. TREND DETECTION & ALGORITHM INSIGHTS
 */
exports.getTrendsAndInsights = async (niche, platform) => {
  const systemPrompt = `You are an elite Algorithm Analyst and Trend Detection Engine for social media platforms.
You actively monitor and predict what is going viral on specific platforms.
You must return your response IN VALID JSON FORMAT ONLY with the following structure:
{
  "trendingTopics": ["topic 1", "topic 2", "topic 3"],
  "trendingHashtags": ["#tag1", "#tag2", "#tag3"],
  "trendingAudioFormats": "e.g., Fast transitions with trending hip-hop bite",
  "algorithmInsights": {
    "engagementFocus": "e.g., Algorithm currently heavily favors Watch Time & Saves over Likes.",
    "predictedReach": "e.g., 40% higher reach if posted between 4PM-6PM",
    "shareabilityFactor": "High - content needs polarizing or highly relatable hooks"
  },
  "crossPlatformStrategy": ["strategy 1", "strategy 2"]
}
Provide highly precise, data-driven, and algorithm-aware insights acting as a real-time analytics engine.`;

  const userPrompt = `Analyze the current algorithmic trends and provide a viral strategy for the niche: "${niche}" on the platform: "${platform}".`;

  return await callAiEngine(systemPrompt, userPrompt);
};

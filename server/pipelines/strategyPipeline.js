const aiFailsafeEngine = require('../engines/aiFailsafeEngine');

class StrategyPipeline {
  async generateViralStrategy(topic, platform) {
    const strategistPrompt = `
      You are an Elite Viral Growth Strategist and AI Content Architect. 
      Target Topic: "${topic}"
      Target Platform: "${platform}"

      MISSION: Architect a multi-layered viral strategy that leverages ${platform}'s specific algorithm signals.
      CONTEXT: The user wants to dominate the niche of "${topic}".
      
      REQUIREMENTS:
      - HOOK: Must be a pattern-interrupt that stops the scroll immediately.
      - CONTENT PLAN: Explain the psychological "Why" behind the strategy.
      - DISTRIBUTION: How to repurpose this for maximum reach.

      Return ONLY a valid JSON object:
      {
        "content_plan": "Strategic roadmap using psychological triggers like 'Open Loops' or 'Social Proof'.",
        "seo_keywords": ["${topic} tips", "${topic} guide", "viral ${topic}"],
        "captions": [
          "Curiosity-driven caption for ${platform}",
          "Value-heavy, saveable caption for ${platform}"
        ],
        "hashtags": ["#${topic.replace(/\s+/g, '')}", "#Viral", "#EliteMarketing"],
        "hook": "Scroll-stopping first line for ${topic}",
        "posting_time": "Optimal peak window for ${platform}",
        "content_type": "The best format (e.g. 7s Reel, LinkedIn Carousel, X Thread)",
        "target_audience": "Specific avatar interested in ${topic}",
        "difficulty_level": "Medium",
        "viral_score": 88,
        "predicted_growth": [
          {"day": "Day 1", "reach": 1200},
          {"day": "Day 2", "reach": 4500},
          {"day": "Day 3", "reach": 12000},
          {"day": "Day 4", "reach": 35000},
          {"day": "Day 5", "reach": 85000}
        ],
        "viral_insights": [
          "Taps into the '${topic}' trending sentiment.",
          "Algorithm-friendly: High completion rate potential."
        ]
      }
    `;

    try {
      const rawResponse = await aiFailsafeEngine.generateContent(strategistPrompt);
      const cleanJson = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (error) {
      console.error('Strategy Pipeline Error:', error);
      // Fail-safe robust mock for demo stability
      return {
        content_plan: "Pattern-matched growth: Utilize curiosity loops combined with high-contrast visuals to bypass feed fatigue.",
        seo_keywords: [topic, "growth hacks", "2025 tips"],
        captions: [`Stop ignoring ${topic}. Here's the truth.`, `The exact $0 framework for ${topic}.`],
        hashtags: ["#strategy", "#growth", "#viral"],
        hook: "Most people are doing this wrong.",
        posting_time: "6:30 PM",
        content_type: "Carousel + Short Video",
        target_audience: "Growth-minded individuals",
        difficulty_level: "Medium",
        viral_score: 72,
        predicted_growth: [
          {"day": "Day 1", "reach": 500},
          {"day": "Day 2", "reach": 2000},
          {"day": "Day 3", "reach": 8000},
          {"day": "Day 4", "reach": 25000},
          {"day": "Day 5", "reach": 50000}
        ],
        viral_insights: ["Hooks matter more than content", "Engagement within 1st hour is critical"]
      };
    }
  }
}

module.exports = new StrategyPipeline();

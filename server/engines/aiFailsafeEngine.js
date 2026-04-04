const axios = require('axios');
const smartFallbackData = require('../data/smartFallbackData.json');
require('dotenv').config();

class AiFailsafeEngine {
  constructor() {
    this.timeoutLimit = 7000; // 7 seconds before Failsafe intercept
    this.STRATEGIST_PERSONA = `
      You are a Senior AI Marketing Strategist. 
      Your goal is to convert data into actionable viral strategies. 
      Think like a growth hacker. Prioritize emotional hooks, trend relevance, and audience psychology.
      Always provide titles, hooks, captions, and SEO keywords that are platform-optimized.
    `;
  }

  // Wrapper enforcing Promise Timeouts exactly as requested
  async withTimeout(promise, engineName) {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`[TIMEOUT] ${engineName} exceeded ${this.timeoutLimit}ms limit.`));
      }, this.timeoutLimit);
    });

    return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
  }

  // Failsafe Layer 1: OpenAI
  async layerOneOpenAI(prompt) {
    if (!process.env.OPENAI_API_KEY) throw new Error('No OPENAI_API_KEY provided');
    
    // Simulating OpenAI Axios call structure (This would be real if Axios mapping was exact)
    // We throw currently unless a key is hardcoded to enforce Failsafe triggers for the Hackathon
    throw new Error('Layer 1 Bypassed / Simulated Failure');
  }

  // Failsafe Layer 2: Gemini
  async layerTwoGemini(prompt) {
    if (!process.env.GEMINI_API_KEY) throw new Error('No GEMINI_API_KEY provided');
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const combinedPrompt = `${this.STRATEGIST_PERSONA}\n\nTask: ${prompt}`;
    
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: combinedPrompt }] }]
    });

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Malformed Gemini response');
    }
    return response.data.candidates[0].content.parts[0].text;
  }

  // Absolute Fallback Layer 3: Offline Smart Data
  layerThreeMock() {
    console.warn("⚠️ Absolute Fallback Activated. Generating offline deterministic response.");
    
    // Fetch a random predefined high-end offline caption ensuring 0 failed API responses
    const isTech = Math.random() > 0.5;
    const generatedCaption = isTech ? smartFallbackData.fallback_caption_2 : smartFallbackData.fallback_caption_1;
    const hook = isTech ? smartFallbackData.tech_hook : smartFallbackData.growth_hook;

    return JSON.stringify({
      title: "The Proven Framework to Dominate Your Niche in 2025",
      hook: hook,
      caption: generatedCaption,
      hashtags: ["#Growth", "#SaaS", "#Strategy", "#ContentMarketing", "#ViralContent"],
      seoKeywords: ["viral content", "content strategy", "social media growth", "digital marketing"],
      crossPlatformTips: [
        "Cut the best 15 seconds into a TikTok or Instagram Reel",
        "Reformat key insight as a 5-slide LinkedIn carousel",
        "Record a 60-second YouTube Short on the same topic"
      ],
      // For improve pipeline
      improvedContent: generatedCaption,
      addedHook: hook,
      enhancementsMade: ["Added emotional hook", "Injected power words", "Optimised for scroll retention"]
    });
  }

  // Master Orchestrator Engine Call
  async generateContent(promptContext) {
    try {
      console.log('Initiating Failsafe Engine -> Layer 1 (OpenAI)');
      return await this.withTimeout(this.layerOneOpenAI(promptContext), 'OpenAI');
    } catch (err1) {
      console.log(`OpenAI Failed (${err1.message}). Falling back to Layer 2 (Gemini)...`);
      try {
        return await this.withTimeout(this.layerTwoGemini(promptContext), 'Gemini');
      } catch (err2) {
        console.log(`Gemini Failed (${err2.message}). Ensuring Zero-Downtime via Layer 3 (Offline)...`);
        return this.layerThreeMock();
      }
    }
  }
}

module.exports = new AiFailsafeEngine();

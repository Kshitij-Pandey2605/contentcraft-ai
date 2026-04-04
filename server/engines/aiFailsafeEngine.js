const axios = require('axios');
const smartFallbackData = require('../data/smartFallbackData.json');
require('dotenv').config();

class AiFailsafeEngine {
  constructor() {
    this.timeoutLimit = 8000; // Increased to 8s to allow longer generation
    this.STRATEGIST_PERSONA = `
      You are the world's most elite AI Marketing Strategist, SEO Expert, and Growth Hacker. 
      Your goal is to convert data into hyper-actionable viral strategies that dominate algorithms. 
      Think like a Senior AI Architect and Digital Marketer. 
      Prioritize:
      - Psychological Triggers (Scarcity, Authority, Social Proof)
      - High-Impact Emotional Hooks
      - Modern Search Intent & Platform-Specific Nuance
      - Step-by-Step Execution Clarity

      FOR EVERY RESPONSE:
      1. Define a laser-focused Target Audience.
      2. Provide a 3-layer SEO Strategy (Primary/Secondary/LSI keywords).
      3. Define a Multi-Platform Distribution Plan.
      4. Include a Conversion Hack to turn views into revenue.
      5. Provide an Execution Plan with Day-by-Day steps.
    `;
  }

  // Wrapper enforcing Promise Timeouts
  async withTimeout(promise, engineName) {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`[TIMEOUT] ${engineName} exceeded ${this.timeoutLimit}ms limit.`));
      }, this.timeoutLimit);
    });

    return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
  }

  // Failsafe Layer 0: Groq (Ultra Fast LLM)
  async layerZeroGroq(prompt) {
    if (!process.env.GROQ_API_KEY) throw new Error('No GROQ_API_KEY provided');
    
    console.log('[ENGINE]: Invoking Groq Llama-3-70B Layer...');
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: this.STRATEGIST_PERSONA },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1024
      },
      { 
        headers: { 
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        } 
      }
    );
    return response.data.choices[0].message.content;
  }

  // Failsafe Layer 1: OpenAI
  async layerOneOpenAI(prompt) {
    if (!process.env.OPENAI_API_KEY) throw new Error('No OPENAI_API_KEY provided');
    
    console.log('[ENGINE]: Invoking OpenAI GPT Layer...');
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: this.STRATEGIST_PERSONA },
          { role: 'user', content: prompt }
        ]
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    return response.data.choices[0].message.content;
  }

  // Failsafe Layer 2: Gemini
  async layerTwoGemini(prompt) {
    if (!process.env.GEMINI_API_KEY) throw new Error('No GEMINI_API_KEY provided');
    
    console.log('[ENGINE]: Invoking Google Gemini Layer...');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const combinedPrompt = `${this.STRATEGIST_PERSONA}\n\nTask: ${prompt}`;
    
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: combinedPrompt }] }]
    });

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Malformed Gemini response');
    }
    return response.data.candidates[0].content.parts[0].text;
  }

  // Failsafe Layer 3: HuggingFace (Open Source Models)
  async layerThreeHuggingFace(prompt) {
    if (!process.env.HF_API_KEY) throw new Error('No HF_API_KEY provided');

    console.log('[ENGINE]: Invoking HuggingFace Mistral Layer...');
    const url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
    const combinedPrompt = `[INST] ${this.STRATEGIST_PERSONA}\n\nTask: ${prompt} [/INST]`;

    const response = await axios.post(url, 
      { inputs: combinedPrompt, parameters: { max_new_tokens: 500, return_full_text: false } },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );

    if (!response.data || !response.data[0]?.generated_text) {
      throw new Error('Malformed HuggingFace response');
    }
    return response.data[0].generated_text;
  }

  // Absolute Fallback Layer 4: Offline Smart Data
  layerFourMock(prompt) {
    console.warn("⚠️ Absolute Fallback Activated. Generating offline deterministic response.");
    
    // Attempting to extract topic from prompt if possible for slightly better variety
    const topicMatch = prompt.match(/Topic: "(.*?)"/) || prompt.match(/topic: "(.*?)"/);
    const topic = topicMatch ? topicMatch[1] : "this topic";
    
    return JSON.stringify({
      targetAudience: "Niche experts and enthusiasts interested in " + topic,
      seoKeywords: [topic, topic + " trends", "viral " + topic],
      contentStrategy: `High-value informational series focused on ${topic} breakthrough techniques.`,
      platformStrategy: "Customized multi-channel blast optimized for " + topic,
      conversionStrategy: `Leverage 'Exclusive ${topic} Guide' as a high-intent lead magnet.`,
      executionPlan: [
        `Day 1: Research core ${topic} pain points.`,
        `Day 2: Create a high-fidelity hook for ${topic}.`,
        "Day 3: Deploy and engage."
      ],
      title: `The Ultimate 2025 Guide to ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
      hook: `Most people are completely misunderstanding ${topic}... here is why.`,
      caption: `If you want to master ${topic} in 2025, you need to ignore the noise and focus on the systems. I've broken down the exact framework I use for ${topic} success.`,
      hashtags: ["#"+topic.replace(/\s+/g, ''), "#Growth", "#Strategy", "#Elite"],
      bestTime: "7:00 PM",
      difficulty_level: "Medium",
      viral_score: 82,
      predicted_growth: [
        {"day": "Day 1", "reach": 450},
        {"day": "Day 2", "reach": 1800},
        {"day": "Day 3", "reach": 7500},
        {"day": "Day 4", "reach": 22000},
        {"day": "Day 5", "reach": 48000}
      ],
      viral_insights: [
        "Uses the 'Authority' psychological trigger.",
        "Algorithm optimization: Topic-relevance confirmed."
      ],
      improvedContent: `Mastering ${topic} isn't a secret, it's a system. Most creators fail because they don't have a roadmap. Here's mine.`,
      addedHook: `🚀 Stop scrolling if you're struggling with ${topic}.`,
      enhancementsMade: ["Added topic-specific hooks", "Injected authority markers", "Optimized for search intent"]
    });
  }

  // Master Orchestrator Engine Call
  async generateContent(promptContext) {
    // Try Groq First (Layer 0)
    try {
      return await this.withTimeout(this.layerZeroGroq(promptContext), 'Groq');
    } catch (err0) {
      console.log(`Groq Failed (${err0.message}). Trying Layer 1 (OpenAI)...`);
      try {
        console.log('Initiating Failsafe Engine -> Layer 1 (OpenAI)');
        return await this.withTimeout(this.layerOneOpenAI(promptContext), 'OpenAI');
      } catch (err1) {
        console.log(`OpenAI Failed (${err1.message}). Falling back to Layer 2 (Gemini)...`);
        try {
          return await this.withTimeout(this.layerTwoGemini(promptContext), 'Gemini');
        } catch (err2) {
          console.log(`Gemini Failed (${err2.message}). Falling back to Layer 3 (HuggingFace)...`);
          try {
            return await this.withTimeout(this.layerThreeHuggingFace(promptContext), 'HuggingFace');
          } catch (err3) {
            console.log(`HuggingFace Failed (${err3.message}). Ensuring Zero-Downtime via Layer 4 (Offline)...`);
            return this.layerFourMock(promptContext);
          }
        }
      }
    }
  }
}

module.exports = new AiFailsafeEngine();

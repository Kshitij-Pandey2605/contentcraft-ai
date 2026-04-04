class ContentAnalyzer {
  constructor() {
    this.powerWords = ['secret', 'hack', 'hidden', 'massive', 'insane', 'free', 'exclusive', 'blueprint', 'framework', 'proven'];
    this.trendKeywords = ['ai', 'growth', 'saas', 'startup', 'money', 'revenue', 'hustle', 'passive', 'chatgpt'];
  }

  analyze(text) {
    if (!text || typeof text !== 'string') {
      return { error: 'Invalid or missing text input.' };
    }

    const payload = text.toLowerCase();
    const wordCount = payload.split(/\s+/).length;
    const charCount = payload.length;
    
    // Regex matches
    const emojisMatch = text.match(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu);
    const emojiCount = emojisMatch ? emojisMatch.length : 0;
    const questionsCount = (payload.match(/\?/g) || []).length;
    const exclamationsCount = (payload.match(/!/g) || []).length;

    // Detect NLP patterns
    const foundPowerWords = this.powerWords.filter(word => payload.includes(word));
    const foundTrendKeywords = this.trendKeywords.filter(word => payload.includes(word));

    return {
      metrics: {
        length: { chars: charCount, words: wordCount },
        structure: {
          questions: questionsCount,
          callsToEmotion: exclamationsCount,
          emojis: emojiCount
        }
      },
      semantics: {
        powerWords: foundPowerWords,
        trendTokens: foundTrendKeywords
      },
      readability: wordCount < 50 ? 'punchy' : (wordCount > 150 ? 'long-form' : 'optimal')
    };
  }
}

module.exports = new ContentAnalyzer();

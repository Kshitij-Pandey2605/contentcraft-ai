class AttentionEngine {
  constructor() {
    this.weakHooks = ["hey guys", "welcome back", "so basically", "i wanted to share", "today we will"];
    this.slowPacingKeywords = ["um", "ah", "like", "you know", "and then", "basically", "literally"];
  }

  analyze(scriptOrConcept) {
    if (!scriptOrConcept) {
      return {
        status: "Error",
        message: "No content provided for analysis."
      };
    }

    const lowerContent = scriptOrConcept.toLowerCase();
    const insights = [];
    let retentionScore = 100;

    // Check Hook Strength (first 10 seconds simulation)
    const hasWeakHook = this.weakHooks.some(hook => lowerContent.substring(0, 50).includes(hook));
    if (hasWeakHook) {
      insights.push({
        type: "Hook",
        issue: "Weak hook detected.",
        message: "Attention drop expected at 3–5 sec. Avoid generic intros like 'Hey guys'.",
        suggestion: "Start with a polarizing statement or a visual shock to disrupt the scroll."
      });
      retentionScore -= 30; // Huge penalty for weak hook
    } else {
       insights.push({
        type: "Hook",
        issue: "Strong hook potential.",
        message: "First 5 seconds look solid.",
        suggestion: "Pair this text with fast movement on screen."
      });
    }

    // Check Pacing
    const pacingIssueCount = this.slowPacingKeywords.reduce((count, word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = lowerContent.match(regex);
        return count + (matches ? matches.length : 0);
    }, 0);

    if (pacingIssueCount > 3) {
      insights.push({
        type: "Pacing",
        issue: "Slow pacing detected.",
        message: "Audience might drop off around 15-20 sec due to filler words or slow delivery.",
        suggestion: "Cut filler words. Use jump cuts or B-roll every 3-4 seconds."
      });
      retentionScore -= (pacingIssueCount * 3);
    }

    // Check Repetitive Content (simulated by analyzing word frequency roughly)
    const words = lowerContent.split(/\s+/);
    const uniqueWords = new Set(words);
    const lexicalRichness = uniqueWords.size / words.length;

    if (lexicalRichness < 0.4 && words.length > 20) {
       insights.push({
        type: "Engagement",
        issue: "Repetitive language.",
        message: "Attention drop late in the video. Content feels repetitive.",
        suggestion: "Introduce a new visual angle or change the background music dynamically."
      });
      retentionScore -= 15;
    }

    // Prevent negative scores
    retentionScore = Math.max(10, Math.min(100, retentionScore));

    return {
      status: "Success",
      retentionScore,
      estimatedDropoff: hasWeakHook ? "3-5 seconds" : (pacingIssueCount > 3 ? "15-20 seconds" : "45+ seconds"),
      insights
    };
  }
}

module.exports = new AttentionEngine();

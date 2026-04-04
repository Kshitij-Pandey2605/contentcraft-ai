class ViralityEngine {
  calculateScore(analyzerResult) {
    let score = 50; // Starting baseline
    const breakdowns = [];
    const improvements = [];

    const { metrics, semantics, readability } = analyzerResult;

    // Evaluate Structural Metrics
    if (metrics.structure.questions > 0) {
      score += 5;
      breakdowns.push('Hooks readers with a clear question.');
    } else {
      improvements.push('Add a question in the first 2 lines to bridge curiosity gaps.');
    }

    if (metrics.structure.emojis >= 1 && metrics.structure.emojis <= 4) {
      score += 4;
      breakdowns.push('Optimal emoji density mapping visually pleasing line breaks.');
    } else if (metrics.structure.emojis > 4) {
      score -= 3;
      improvements.push('Too many emojis. It looks spammy. Reduce to 2-3 maximum.');
    }

    // Evaluate Semantic Power
    if (semantics.powerWords.length > 0) {
      score += semantics.powerWords.length * 3;
      breakdowns.push(`Strong emotional triggers detected (${semantics.powerWords.join(', ')}).`);
    } else {
      improvements.push('Inject authoritative Power Words (e.g., "secret", "proven", "blueprint") to trigger FOMO.');
    }

    if (semantics.trendTokens.length > 0) {
      score += semantics.trendTokens.length * 4;
      breakdowns.push(`Piggybacking perfectly on high-volume algorithmic trend keywords (${semantics.trendTokens.join(', ')}).`);
    }

    // Evaluate Length Optimization
    if (readability === 'punchy') {
      score += 15;
      breakdowns.push('Punchy, highly digestible length optimized for scrolling retention.');
    } else if (readability === 'long-form') {
      score -= 5;
      improvements.push('Text exceeds optimal scroll length. Break it into a carousel or Twitter thread.');
    } else {
      score += 8;
      breakdowns.push('Solid medium-form read.');
    }

    // Random engagement luck (Simulating the Algorithm Chaos Factor)
    const algorithmChaos = Math.floor(Math.random() * 10) - 4; // -4 to +6
    score += algorithmChaos;
    
    if (algorithmChaos > 4) {
      breakdowns.push('+ Algorithmic Luck Bias (Simulated favorable timing factor).');
    }

    // Cap bounds mathematically
    score = Math.max(10, Math.min(99, score));

    return {
      score,
      status: score >= 85 ? 'Viral' : (score >= 65 ? 'Good' : 'Needs Optimization'),
      breakdowns,
      improvements
    };
  }
}

module.exports = new ViralityEngine();

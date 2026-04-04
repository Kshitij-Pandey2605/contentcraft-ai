class ViralityEngine {
  calculateScore(analyzerResult) {
    const { metrics, semantics, readability } = analyzerResult;

    // 1. Calculate Engagement Score (0-100)
    let engagement = 60; // Base
    if (metrics.structure.questions > 0) engagement += 10;
    if (metrics.structure.emojis >= 1 && metrics.structure.emojis <= 3) engagement += 10;
    engagement += Math.min(20, semantics.powerWords.length * 5);
    if (readability === 'punchy') engagement += 10;
    engagement = Math.min(100, engagement);

    // 2. Calculate Trend Score (0-100)
    let trend = 40; // Base
    trend += Math.min(60, semantics.trendTokens.length * 15);
    trend = Math.min(100, trend);

    // 3. Calculate SEO Strength (0-100)
    let seo = 50; // Base
    if (metrics.length.words > 10 && metrics.length.words < 50) seo += 20;
    if (semantics.powerWords.length > 2) seo += 15;
    if (readability !== 'optimal') seo += 10;
    seo = Math.min(100, seo);

    // 4. Final Viral Score Formula
    // viralScore = (engagement * 0.4) + (trend * 0.3) + (seo * 0.3)
    let score = (engagement * 0.4) + (trend * 0.3) + (seo * 0.3);
    score = Math.floor(score);

    // Metadata for UI
    const breakdowns = [
      `Engagement Factor: ${engagement}% (Structure + Emotional Triggers)`,
      `Trend Relevance: ${trend}% (Algorithmic Keyword Matching)`,
      `SEO Strength: ${seo}% (Discoverability & Hook Power)`
    ];

    const improvements = [];
    if (engagement < 70) improvements.push('Add a direct question to the audience.');
    if (trend < 60) improvements.push('Use more trending industry keywords.');
    if (seo < 70) improvements.push('Optimize length for better scroll-depth.');

    return {
      score,
      status: score >= 85 ? 'Viral' : (score >= 65 ? 'Good' : 'Needs Optimization'),
      breakdowns,
      improvements,
      metrics: { engagement, trend, seo }
    };
  }
}

module.exports = new ViralityEngine();

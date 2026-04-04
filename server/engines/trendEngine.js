const mockTrends = require('../data/mockTrends.json');
const cache = require('../cache/memoryCache');

class TrendEngine {
  getLatestTrends(platform = 'Instagram') {
    // Normalize platform for case-insensitive lookup
    const platformMap = {
      'instagram': 'Instagram',
      'tiktok': 'TikTok',
      'linkedin': 'LinkedIn',
      'youtube': 'YouTube',
      'twitter/x': 'Twitter/X',
      'x': 'Twitter/X'
    };
    
    const normalizedPlatform = platformMap[String(platform).toLowerCase()] || 'Instagram';
    console.log(`[TREND_ENGINE]: Scanning Market for Platform: ${normalizedPlatform} (Input: ${platform})`);

    const activePlatform = mockTrends[normalizedPlatform] ? normalizedPlatform : 'Instagram';
    
    // Check Cache First with platform-specific key
    const cacheKey = `v2_trends_${activePlatform}`; // Versioned key to break old ghost caches
    const cachedTrends = cache.get(cacheKey);
    if (cachedTrends) {
      console.log(`[TREND_ENGINE]: Serving cached trends for ${activePlatform}`);
      return cachedTrends;
    }

    // Simulate Algorithmic Fluctuation if not cached
    const platformTrends = mockTrends[activePlatform] || mockTrends['Instagram'];
    const activeTrends = platformTrends.map((trend, idx) => {
      // Fluctuate basescore mathematically with more entropy
      const fluctuation = (Math.random() * 30) - 12; // -12 to +18
      let newScore = Math.min(100, Math.max(0, trend.baseScore + fluctuation));
      newScore = Number(newScore.toFixed(2));

      let status = 'stable';
      if (fluctuation > 8) status = '🚀 exploding';
      else if (fluctuation > 3) status = '📈 growing';
      else if (fluctuation < -4) status = '📉 falling';

      const growthValue = fluctuation > 0 ? `+${Math.floor(fluctuation * 2 + 10)}%` : `-${Math.floor(Math.abs(fluctuation) * 2)}%`;
      const timeframes = ['12-24 hours', '24-48 hours', '1-3 days', 'Next 6 hours', 'Next 2 hours'];

      return {
        id: trend.id,
        topic: trend.topic,
        category: trend.category,
        score: newScore,
        viralityScore: Math.floor(newScore),
        growth: growthValue,
        status: status,
        engagementScore: Math.floor(newScore * 0.8 + (Math.random() * 20)),
        timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
        updatedAt: new Date().toISOString()
      };
    });

    console.log(`[TREND_ENGINE]: Generated ${activeTrends.length} new trends for ${activePlatform}`);
    
    // Sort by most viral
    activeTrends.sort((a, b) => b.score - a.score);

    // Set cache for 60 seconds
    cache.set(cacheKey, activeTrends, 60);

    return activeTrends;
  }
}

module.exports = new TrendEngine();

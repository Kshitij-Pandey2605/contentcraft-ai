const mockTrends = require('../data/mockTrends.json');
const cache = require('../cache/memoryCache');

class TrendEngine {
  getLatestTrends() {
    // Check Cache First
    const cachedTrends = cache.get('trends');
    if (cachedTrends) return cachedTrends;

    // Simulate Algorithmic Fluctuation if not cached
    const activeTrends = mockTrends.map(trend => {
      // Fluctuate basescore mathematically
      const fluctuation = (Math.random() * 20) - 8; // -8 to +12
      let newScore = Math.min(100, Math.max(0, trend.baseScore + fluctuation));
      newScore = Number(newScore.toFixed(1));

      let status = 'stable';
      if (fluctuation > 8) status = '🚀 exploding';
      else if (fluctuation > 3) status = '📈 growing';
      else if (fluctuation < -4) status = '📉 falling';

      return {
        id: trend.id,
        topic: trend.topic,
        category: trend.category,
        score: newScore,
        status: status,
        updatedAt: new Date().toISOString()
      };
    });

    // Sort by most viral
    activeTrends.sort((a, b) => b.score - a.score);

    // Set cache for 5 minutes (300 seconds)
    cache.set('trends', activeTrends, 300);

    return activeTrends;
  }
}

module.exports = new TrendEngine();

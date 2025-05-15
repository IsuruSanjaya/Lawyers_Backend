const statisticsService = require('../services/statisticsService');

exports.getStatistics = async (req, res) => {
  const lawyerId = req.params.lawyerId;
  try {
    const metrics = await statisticsService.calculateMetrics(lawyerId);
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
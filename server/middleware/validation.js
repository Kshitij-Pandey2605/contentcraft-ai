// Middleware to validate incoming API requests

exports.validateGenerateRequest = (req, res, next) => {
  const { prompt, topic, message } = req.body;
  if (!prompt && !topic && !message) {
    return res.status(400).json({ error: 'Input (prompt, topic, or message) is required.' });
  }
  next();
};

exports.validateAttentionRequest = (req, res, next) => {
  const { script } = req.body;
  if (!script || typeof script !== 'string') {
    return res.status(400).json({ error: 'A script or concept text must be provided for analysis.' });
  }
  if (script.length < 10) {
     return res.status(400).json({ error: 'Script text is too short for meaningful analysis.' });
  }
  next();
};

const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Placeholder: video / chat session creation
router.post('/session', auth, (req, res) => {
  // integrate with Twilio / Agora / WebRTC here
  res.json({ sessionId: 'dummy-session-id', message: 'Video session created' });
});

module.exports = router;

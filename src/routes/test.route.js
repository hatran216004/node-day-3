const express = require('express');

const router = express.Router();

router.get('/test-success', (_, res) => {
  res.success({ message: 'Hello World' });
});

router.get('/test-error', (req, res) => {
  throw new Error('Test exception');
});

module.exports = router;

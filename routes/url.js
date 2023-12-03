const express = require("express");
const router = express.Router();
const { generateShortUrl, redirctingUrl, handleAnalytics } = require('../controllers/url')
const { protect } = require('../middleware/auth')
router.post('/generate', protect, generateShortUrl)
router.get('/:id', redirctingUrl)
router.get('/analytics/:id', handleAnalytics)

module.exports = router
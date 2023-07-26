const express = require('express')
const router = express.Router();
const fetchNews = require('../controller/data');
const feedbackController = require('../controller/feedback');

router.get('/all/:topic', fetchNews);
router.post('/feedback',feedbackController)

module.exports = router
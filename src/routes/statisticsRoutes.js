const express = require('express');
const router = express.Router();
const controller = require('../controllers/statisticsController');

router.get('/:lawyerId', controller.getStatistics);


module.exports = router;

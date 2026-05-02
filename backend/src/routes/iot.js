const express = require('express');
const router = express.Router();
const iotController = require('../controllers/iotController');
const { authenticate } = require('../middleware/auth');

// Process water quality data from IoT devices
router.post('/water', (req, res) => iotController.processWaterData(req, res));

// Get water quality history for a village
router.get('/water/history/:village', authenticate, (req, res) => iotController.getWaterQualityHistory(req, res));

// Get water quality statistics for a village
router.get('/water/stats/:village', authenticate, (req, res) => iotController.getWaterQualityStats(req, res));

module.exports = router;

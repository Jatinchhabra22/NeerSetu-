const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticate, authorize } = require('../middleware/auth');

// Get dashboard statistics
router.get('/dashboard', authenticate, (req, res) => analyticsController.getDashboardStats(req, res));

// Get village analytics
router.get('/village/:village', authenticate, (req, res) => analyticsController.getVillageAnalytics(req, res));

// Generate report
router.get('/report', authenticate, authorize(['official', 'admin']), (req, res) => analyticsController.generateReport(req, res));

// Get risk distribution
router.get('/risk-distribution', authenticate, (req, res) => analyticsController.getRiskDistribution(req, res));

// Get monthly trends
router.get('/monthly-trends', authenticate, (req, res) => analyticsController.getMonthlyTrends(req, res));

module.exports = router;

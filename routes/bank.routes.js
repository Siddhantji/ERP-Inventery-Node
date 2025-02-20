const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bank.controller');
const companyMiddleware = require("../middleware/companyMiddleware");
router.use(companyMiddleware);

// Create a new bank
router.post('/createBank', bankController.createBank);

// Get all banks
router.get('/getBanksName', bankController.getBanksName);

// Get bank by ID
router.get('/getBankById/:id', bankController.getBankById);

module.exports = router;
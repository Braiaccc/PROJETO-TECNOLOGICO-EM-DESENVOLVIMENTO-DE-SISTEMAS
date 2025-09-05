// backend/src/routes/rentals.js
const express = require('express');
const router = express.Router();
const rentalsController = require('../api/rentals/rentals.controller');

// Rota para criar um novo aluguel
router.post('/rentals', rentalsController.createRental);

// Rota para buscar todos os aluguéis
router.get('/rentals', rentalsController.getRentals);

module.exports = router;
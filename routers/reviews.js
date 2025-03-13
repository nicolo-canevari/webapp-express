// GESTIONE DELLE ROTTE PER TUTTE LE RECENSIONI
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviesController');

// Recupera tutte le recensioni
router.get('/', movieController.index);

// Recupera una recensione specifica
router.get('/:id', movieController.show);

// Crea una nuova recensione
router.post('/', movieController.store);

module.exports = router;
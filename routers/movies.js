// Importo la libreria express
const express = require('express');
// Creao un router in Express che vada a gestire le rotte in modo modulare e organizato 
const router = express.Router();

// Importo il controller
const movieController = require('../controllers/moviesController');


// ROTTE

// Index: Visualizza tutti i post
router.get('/', movieController.index);

// Show: Visualizza un post tramite id
router.get('/:id', movieController.show);

// Store: Crea un nuovo post
// router.post('/', movieController.store);

// Update: Modifica un post tramite id
// router.put('/:id', movieController.update);

// Destroy: Cancella un post tramite id
// router.delete('/:id', movieController.destroy);

// esportazione del router
module.exports = router;
const express = require('express');
const { Router } = require('express');
const practicaController = require('../controladores/apiController');

const router = express.Router();
router.get('/practica', practicaController.getPractica);
router.put('/api/practica/:id', practicaController.updatePractica);
router.post('/api/practica', practicaController.addPractica);
router.delete('/api/practica/:id', practicaController.deletePractica);
router.get('/datos-rango/min=:min&max=:max', practicaController.getPracticaInRange);

module.exports = router;
const express = require('express');
const router = express.Router();
const practicaController = require('../controladores/apiController');

router.get('/practica', practicaController.getPractica);
router.put('/api/practica/:id', practicaController.updatePractica);
router.post('/api/practica', practicaController.addSensorData); 
router.delete('/api/practica/:id', practicaController.deletePractica);
router.get('/datos-rango/min=:min&max=:max', practicaController.getPracticaInRange);

module.exports = router;

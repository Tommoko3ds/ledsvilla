const mysql = require('mysql2');
const db = require('../database');
const addSensorData = (req, res) => {
  
  const { distancia, led_color, pir_state } = req.body;

  // Determinar si hay movimiento o no
  const dato_sensor = pir_state === 1 ? 'hay movimiento' : 'no hay movimiento';

  const sql = 'INSERT INTO practica (Mensaje, Led_color, pir_led, Dato_sensor) VALUES (?, ?, ?, ?)';
  const mensaje = `${distancia},${led_color},${pir_state}`;

  db.query(sql, [mensaje, led_color, pir_state, dato_sensor], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: result.insertId, distancia, led_color, pir_state, dato_sensor });
    }
  });
};




const getPractica = (req, res) => {
  const sql = 'SELECT 	Mensaje, Led_color, Dato_sensor, pir_led, fecha FROM practica ORDER BY id_tabla DESC LIMIT 100';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      console.log('Results:', results);
      res.json(results);
    }
  });
};

const updatePractica = (req, res) => {
  const { Dato_sensor } = req.body;
  const sql = 'UPDATE practica SET dato_sensor=? WHERE id_tabla=?';
  db.query(sql, [Dato_sensor, req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: req.params.id, Dato_sensor });
    }
  });
};

const deletePractica = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM practica WHERE Id_tabla=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'No se encontró el elemento para eliminar' });
      } else {
        res.json({ message: 'Elemento eliminado correctamente' });
      }
    }
  });
};

const getPracticaInRange = (req, res) => {
  const { min, max } = req.params;

  const sql = 'SELECT * FROM practica WHERE Mensaje >= ? AND Mensaje <= ?';
  db.query(sql, [min, max], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      console.log('Results:', results);
      res.json(results);
    }
  });
};

module.exports = {
  addSensorData,
  getPractica,
  updatePractica,
  deletePractica,
  getPracticaInRange
};

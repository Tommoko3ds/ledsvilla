const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const practicaController = require('./controladores/apiController');
const apiRouter = require('./rutas/apiRutas');

const app = express();
const PORT = process.env.PORT || 8080; // Cambiado el puerto a 8080

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

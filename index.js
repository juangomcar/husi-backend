const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('Sistema HUSI funcionando');
});

// Endpoint de ejemplo
app.get('/pacientes', (req, res) => {
  res.json([
    { id: 1, nombre: "Juan Pérez", estado: "Hospitalizado" },
    { id: 2, nombre: "Laura Gómez", estado: "Dado de alta" }
  ]);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

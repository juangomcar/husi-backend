const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Esquema y modelo
const PacienteSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  estado: String
});

// Modelo conectado a la colección "Paciente" en la base "Husi"
const Paciente = mongoose.model('Paciente', PacienteSchema, 'Paciente');

// Conexión a MongoDB Atlas usando tu cadena de conexión
mongoose.connect('mongodb+srv://jfgomez4224:TbKdpcomRmE60nZt@cluster1.ykz0iga.mongodb.net/Husi?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado a MongoDB Atlas');
  app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
  });
})
.catch(err => {
  console.error('❌ Error al conectar a MongoDB', err);
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('Sistema HUSI funcionando');
});

// Endpoint para obtener pacientes
app.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (err) {
    console.error('❌ Error al obtener pacientes:', err);
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
});

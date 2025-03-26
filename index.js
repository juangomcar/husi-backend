const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const PacienteSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  estado: String
});

const Paciente = mongoose.model('Paciente', PacienteSchema, 'Paciente');

mongoose.connect('mongodb+srv://jfgomez4224:6iLNFn2UhbuOpktD@ac-ccq6eni-shard-00-00.jnt0kh7.mongodb.net/Paciente?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

app.get('/', (req, res) => {
  res.send('Sistema HUSI funcionando');
});

app.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (err) {
    console.error('❌ Error al obtener pacientes:', err);
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
});

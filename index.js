const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://jfgomez4224:6iLNFn2UhbuOpktD@ac-ccq6eni-shard-00-00.jnt0kh7.mongodb.net/husi?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error al conectar a MongoDB', err));

const PacienteSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  estado: String
});

const Paciente = mongoose.model('Paciente', PacienteSchema, 'pacientes'); // <-

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

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

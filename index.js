const express = require('express');
const mongoose = require('mongoose'); // <- AÑADIDO
const app = express();
const port = process.env.PORT || 3000;

// Conexión a MongoDB Atlas
mongoose.connect('mongodb://jfgomez4224:6iLNFn2UhbuOpktD@ac-ccq6eni-shard-00-00.jnt0kh7.mongodb.net:27017,ac-ccq6eni-shard-00-01.jnt0kh7.mongodb.net:27017,ac-ccq6eni-shard-00-02.jnt0kh7.mongodb.net:27017/?replicaSet=atlas-3n7pum-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error al conectar a MongoDB', err));

// Esquema y modelo
const PacienteSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  estado: String
});

const Paciente = mongoose.model('Paciente', PacienteSchema);

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('Sistema HUSI funcionando');
});

// Endpoint real desde MongoDB
app.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.find(); // <- busca en MongoDB
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

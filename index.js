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
const Paciente = mongoose.model('pacientes', PacienteSchema, 'pacientes'); // <- colección explícita

// Conexión a MongoDB Atlas
mongoose.connect('mongodb://jfgomez4224:6iLNFn2UhbuOpktD@ac-ccq6eni-shard-00-00.jnt0kh7.mongodb.net/husi?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado a MongoDB Atlas');

  // Esperar apertura completa
  mongoose.connection.once('open', () => {
    console.log('✅ Conexión completamente abierta');

    // Iniciar servidor después de conexión completa
    app.listen(port, () => {
      console.log(`Servidor corriendo en puerto ${port}`);
    });
  });
})
.catch(err => {
  console.error('❌ Error al conectar a MongoDB', err);
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('Sistema HUSI funcionando');
});

// Endpoint de pacientes
app.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (err) {
    console.error('❌ Error al obtener pacientes:', err);
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
});

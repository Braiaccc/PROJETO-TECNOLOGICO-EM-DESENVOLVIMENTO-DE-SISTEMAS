require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./src/config/db'); // Importação corrigida
const rentalsRouter = require('./src/routes/rentals');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
connectToDatabase().then(() => {
  console.log('Servidor conectado ao MongoDB.');
}).catch(err => {
  console.error('Erro na conexão com o MongoDB:', err);
  process.exit(1);
});

// Rotas da API
app.use('/api', rentalsRouter);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});

// backend/src/models/Rental.js
const { ObjectId } = require('mongodb');

// Esta função representa a estrutura dos seus documentos no MongoDB.
// Não é um "modelo" de ORM como Mongoose, mas uma representação para clareza.
const RentalModel = {
  // Simplesmente descreve os campos esperados
  id: String,
  cliente: String,
  materiais: [String],
  dataRetirada: String,
  dataDevolucao: String,
  dataRealDevolucao: String,
  status: String,
  pagamento: String,
  valor: Number,
  diasAtraso: Number
};

module.exports = RentalModel;
const { connectToDatabase } = require('../../config/db');

async function createRental(req, res) {
  try {
    const db = await connectToDatabase();
    const rentalsCollection = db.collection('rentals');
    const newRental = req.body;
    
    // Insere o novo aluguel na coleção 'rentals'
    const result = await rentalsCollection.insertOne(newRental);

    res.status(201).json({
      message: "Aluguel criado com sucesso!",
      rentalId: result.insertedId,
      rental: newRental
    });

  } catch (error) {
    console.error("Erro ao salvar aluguel:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

async function getRentals(req, res) {
  try {
    const db = await connectToDatabase();
    const rentalsCollection = db.collection('rentals');
    const rentals = await rentalsCollection.find({}).toArray();

    res.status(200).json(rentals);

  } catch (error) {
    console.error("Erro ao buscar aluguéis:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

module.exports = { createRental, getRentals };
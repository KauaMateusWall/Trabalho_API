const express = require('express');
const cors = require('cors'); // Para permitir requisições do frontend
const mobileRoutes = require('./routes/mobileRoutes');

const app = express();
const PORT = 3000; // Porta para o BFF


app.use(cors()); // Permite que o frontend (em outra porta) acesse este BFF
app.use(express.json()); // Permite que o servidor entenda JSON

// Rotas do BFF para o frontend mobile
app.use('/api/mobile', mobileRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('BFF está online!');
});

app.listen(PORT, () => {
    console.log(`BFF rodando em http://localhost:${PORT}`);
});
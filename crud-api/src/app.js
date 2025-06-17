const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors'); // Para permitir requisições do frontend

const app = express();
const PORT = 3001; // Porta para a API CRUD

// Middlewares
app.use(cors()); // Permite que o frontend (em outra porta) acesse esta API
app.use(bodyParser.json());

// Rotas para livros
app.use('/api/books', bookRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API CRUD de Livros está online!');
});

app.listen(PORT, () => {
    console.log(`API CRUD de Livros rodando em http://localhost:${PORT}`);
});
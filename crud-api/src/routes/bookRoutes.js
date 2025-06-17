
const express = require('express');
const router = express.Router();
const { books, getNextId, recalculateNextId } = require('../data/books');

// GET todos os livros
router.get('/', (req, res) => {
    res.json(books);
});

// GET livro por ID
router.get('/:id', (req, res) => {
    const { id } = parseInt(req.params.id); // Converte o ID para número
    const book = books.find(b => b.id === id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

// POST um novo livro
router.post('/', (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Título, autor e ano são obrigatórios.' });
    }
    const newBook = { id: getNextId(), title, author, year: parseInt(year) }; // Usa a nova função
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT (atualiza) um livro por ID
router.put('/:id', (req, res) => {
    const { id } = parseInt(req.params.id); 
    const { title, author, year } = req.body;
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], title, author, year: parseInt(year) };
        res.json(books[bookIndex]);
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

// DELETE um livro pory ID
router.delete('/:id', (req, res) => {
    const { id } = parseInt(req.params.id);
    const initialLength = books.length;
    const newBooks = books.filter(b => b.id !== id);

    if (newBooks.length < initialLength) {
        books.splice(0, books.length, ...newBooks);
        recalculateNextId();
        res.status(204).send(); 
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

module.exports = router;
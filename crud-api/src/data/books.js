

let books = [
    { id: 1, title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', year: 1943 },
    { id: 2, title: 'Dom Quixote', author: 'Miguel de Cervantes', year: 1605 },
    { id: 3, title: '1984', author: 'George Orwell', year: 1949 }
];

let nextId = Math.max(...books.map(book => book.id)) + 1;

module.exports = {
    books,
    getNextId: () => { 
        const currentId = nextId;
        nextId++;
        return currentId;
    },
    recalculateNextId: () => {
        if (books.length === 0) {
            nextId = 1;
        } else {
            nextId = Math.max(...books.map(book => book.id)) + 1;
        }
    }
};
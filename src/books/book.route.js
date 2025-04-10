const express = require('express');
const router = express.Router();
const { postABook, getAllBooks, getSingleBook, UpdateBook, DeleteBook, getBookGroupBy } = require('./book.controller');

//post a book
router.post('/create-book', postABook);

//get all books
router.get('/', getAllBooks);

//get a single book
router.get('/:id', getSingleBook);

//update a book
router.put('/edit/:id', UpdateBook);

//delete a book
router.delete('/delete/:id', DeleteBook)

//get books group by
router.get('/groupby/book', getBookGroupBy)

module.exports = router;
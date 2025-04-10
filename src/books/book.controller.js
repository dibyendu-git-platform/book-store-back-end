const Book = require("./book.model");

const postABook = async (req, res) => {
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Book Posted successfully", book: newBook});
    } catch (error) {
        console.log("Error creating Book", error)
        res.status(500).send({message: "Failed to create a book"});
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(books);
    } catch (error) {
        console.log("Error fetching Books", error)
        res.status(500).send({message: "Failed to fetch books"});
    }
}

const getSingleBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if(!book){
            res.status(400).send({message:"Book Not Found" ,book});
        }
        res.status(200).send({message:"Book fetched sucessfully" ,book});
    } catch (error) {
        console.log("Error fetching Book", error)
        res.status(500).send({message: "Failed to fetch book"});
    }
}

const UpdateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedBook){
            res.status(400).send({message:"Book Not Found"});
        }
        res.status(200).send({message:"Book Updated sucessfully", updatedBook});
    } catch (error) {
        console.log("Error Updating Book", error)
        res.status(500).send({message: "Failed to Update book"});
    }
}

const DeleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook){
            res.status(400).send({message:"Book Not Found"});
        }
        res.status(200).send({message:"Book Deleted sucessfully", deletedBook});
    } catch (error) {
        console.log("Error Deleting Book", error);
        res.status(500).send({message: "Failed to Delete book"});
    }
}

const getBookGroupBy = async (req, res) => {
    try {
        const data = await Book.aggregate([ { 
            $group : 
                { 
                    _id : "$category", 
                    bookCount: { $count: { } },
                    newPriceSum: { $sum: "$newPrice" },
                    oldPriceSum: { $sum: "$oldPrice" }
                } 
            } 
        ]);
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    DeleteBook,
    getBookGroupBy
};
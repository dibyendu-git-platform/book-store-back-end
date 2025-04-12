const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3001
const cors = require("cors")

//middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173','https://bookstorebydibyendu.vercel.app'],
  credentials: true
}));

//routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes =  require("./src/users/user.route");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use('/', (req, res) =>{
      res.send('Hello! Welcome To My Book Server');
  })
}

main().then(() => console.log("mongodb connected successfully")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
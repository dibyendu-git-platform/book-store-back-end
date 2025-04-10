const express = require('express');
const router = express.Router();

const { orderBook, getOrderByEmail } = require('./order.controller');

router.post('/create-order', orderBook);

router.get('/get-orders/:email', getOrderByEmail);


module.exports = router;
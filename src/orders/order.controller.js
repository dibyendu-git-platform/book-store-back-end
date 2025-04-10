const Order = require("./order.model");


const orderBook = async (req, res) => {
    try {
        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).send({ message: "Order Created Successfully", savedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Failed to create Order", error});
    }
}

const getOrderByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const Orders = await Order.find({email}).sort({createdAt: -1});
        if(!Orders){
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).send(Orders);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Failed to Fetch Order", error});
    }
}

module.exports = {
    orderBook,
    getOrderByEmail
}
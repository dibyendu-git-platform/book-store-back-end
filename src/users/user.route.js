const express = require('express');
const User = require('./user.model');

const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/admin", async (req, res) => {
    const {username, password} = req.body;
    try {
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
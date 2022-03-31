const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js");

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY);
}

router.post("", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send({ message: 'Wrong Email or Password' });
        }

        const match = user.checkPassword(req.body.password);

        if (!match) {
            return res.status(400).send({ message: 'Wrong Email or Password' });
        }

        const token = generateToken(user);

        if(user.role == "customer"){
            return res.status(200).redirect('http://127.0.0.1:5500/Cult.fit/eat.html');
        }
        else{
            return res.status(200).redirect('http://127.0.0.1:5500/Cult.fit/eat-admin.html');
        }
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;
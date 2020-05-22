const express = require('express');
const Users = require('../users/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secrets = require('./secrets');
const router = express.Router();

// register
router.post("/register", (req, res) => {
    let user = req.body;

    // hash the password! 
    const rounds = process.env.HASH_ROUNDS || 14;
    const hash = bcrypt.hashSync(user.password, rounds);
    // store the hashed password instead of
    // the password the user sent in
    user.password = hash;

    // add new user to the users table
    Users.add(user)
    .then(response => res.status(201).json(response))
    .catch(error => res.status(500).json({ errorMessage: error.message }))
});

// login
router.post("/login", (req, res) => {
    let { username, password } = req.body;

    // first find them by username
    Users.findBy({ username })
    .then(([user]) => {
        // check that the passwords match
        if( user && bcrypt.compareSync(password, user.password)){
            // proceed to log them in
            // produce a token using generateToken
            // which is a function i wrote at the bottom of this file, 
            // just scroll down a bit
            const token = generateToken(user); 
            
            // send the token to the client
            res.status(200).json({ message: "Welcome!", token })
        } else {
            res.status(401).json({ errorMessage: "You shall not pass!"});
        }
    })
    .catch(error => res.status(500).json({ errorMessage: error.message }))
})


function generateToken(user) {
    // first, the data
    const payload = {
        userId: user.id,
        username: user.username
    };
    const secret = secrets.jwtSecret;

    const options = {
        expiresIn: "1d"
    }

    return jwt.sign(payload, secret, options);
}

module.exports = router;
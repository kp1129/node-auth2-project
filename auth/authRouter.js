const express = require('express');
const Users = require('../users/usersModel');
const bcrypt = require('bcryptjs');
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

// logout

module.exports = router;
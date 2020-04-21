const express = require('express');
const Users = require('./usersModel');

const router = express.Router();

router.get("/", (req, res) => {
    Users.getAll()
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ errorMessage: error.message }))
})

module.exports = router;
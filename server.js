const express = require('express');
const helmet = require('helmet');

const usersRouter = require('./users/usersRouter');
const authRouter = require('./auth/authRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/users", usersRouter );
server.use("/api", authRouter );

server.get("/", (req, res) => {
    res.status(200).json({ message: "good to go!" })
})

module.exports = server;
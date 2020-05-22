const jwt = require('jsonwebtoken');
const secrets = require('./secrets');

module.exports = (req, res, next) => {
    const secret = secrets.jwtSecret;
    // since tokens are normally sent as the Authorization header...
    const token = req.headers.authorization;

    if(token){
        // verify that it's valid
        jwt.verify(token, secret, (error, decodedToken) => {
            // if everything is legit, then error will be undefined
            if(error) {
                // if error is NOT undefined, something's up
                res.status(401).json({ errorMessage: "NO."})
            } else {
                // we can make the decoded token available on the req object
                req.decodedToken = decodedToken;

                next();
            }
        })
    } else {
        // if no token
        res.status(400).json({ errorMessage: "Please provide credentials" })
    }
}
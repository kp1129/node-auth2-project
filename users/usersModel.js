const db = require('../connection');

module.exports = {
    getAll
}


// BEFORE FINAL SUBMIT
// BE SURE TO SET IT UP SO THAT
// GETALL
// DOES NOT RETURN EVERYONE'S PASSWORD LOL
function getAll() {
    return db('users')
}
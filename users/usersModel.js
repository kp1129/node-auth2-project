const db = require('../connection');

module.exports = {
    getAll,
    findById,
    add
}


// BEFORE FINAL SUBMIT
// BE SURE TO SET IT UP SO THAT
// GETALL
// DOES NOT RETURN EVERYONE'S PASSWORD LOL
function getAll() {
    return db('users')
}

function findById(id) {
    return db('users').where({ id })
}

function add(user) {
    return db('users').insert(user)
}
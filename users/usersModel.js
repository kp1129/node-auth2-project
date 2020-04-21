const db = require('../connection');

module.exports = {
    getAll,
    findById,
    add,
    findBy
}


// BEFORE FINAL SUBMIT
// BE SURE TO SET IT UP SO THAT
// GETALL
// DOES NOT RETURN EVERYONE'S PASSWORD LOL
function getAll() {
    return db('users')
}

function findById(id) {
    return db('users').where({ id }).first()
}

async function add(user) {
    const [id] = await db('users').insert(user, "id");

    return findById(id)
}

function findBy(filter) {
    return db('users').where(filter);
}
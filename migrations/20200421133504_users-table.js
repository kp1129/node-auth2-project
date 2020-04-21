
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    //   primary key
    tbl.increments();
    // username
    tbl.string('username')
        .unique()
        .notNullable();
    // password
    tbl.string('password')
        .notNullable();
    // department
    tbl.string('department')
        .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};

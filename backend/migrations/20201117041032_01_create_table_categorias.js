
exports.up = function(knex) {
    return knex.schema.createTable('Categorias', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
    })
};

exports.down = function(knex) {
    return kenex.schema.dropTable('Categorias') 
};

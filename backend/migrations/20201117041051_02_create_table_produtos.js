
exports.up = function(knex) {
    return knex.schema.createTable('Produtos', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.dateTime ('manufacturingDate').notNull(),
        table.boolean('perishableProduct').notNull(),
        table.dateTime('expirationDate').notNull(),
        table.decimal('price', 5, 2).notNull(),
        table.integer('categoryId').references('id').inTable('Categorias')
            .notNull()
    })
};

exports.down = function(knex) {
    return kenex.schema.dropTable('Produtos') 
};

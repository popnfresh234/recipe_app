/* eslint func-names: 0 */ // --> OFF
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNull();
      table.string('email').notNull();
      table.string('password').notNull();
    }),
    knex.schema.createTable('recipes', (table) => {
      table.increments('id').primary();
      table.string('name').notNull();
      table.string('category');
      table.string('description');
      table.string('directions');
      table.integer('user_id').references('id').inTable('users');
    }),

    knex.schema.createTable('ingredients', (table) => {
      table.increments('id').primary();
      table.string('name').notNull();
    }),

    knex.schema.createTable('recipe_ingredient', (table) => {
      table.increments('id').primary();
      table.float('quantity');
      table.integer('recipe_id').references('id').inTable('recipes');
      table.integer('ingredient_id').references('id').inTable('ingredients');
    }),

    knex.schema.createTable('favorites', (table) => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.integer('recipe_id').references('id').inTable('recipes');
    }),

  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([

    knex.schema.dropTableIfExists('recipes'),
    knex.schema.dropTableIfExists('ingredients'),
    knex.schema.dropTableIfExists('recipe_ingredient'),
    knex.schema.dropTableIfExists('favorites'),
    knex.schema.dropTableIfExists('users'),
  ]);
};

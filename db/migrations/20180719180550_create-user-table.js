/* eslint func-names: 0 */ // --> OFF
exports.up = function ( knex, Promise ) {
  return Promise.all( [
    knex.schema.createTable( 'users', ( table ) => {
      table.increments( 'id' ).primary();
      table.string( 'name' ).notNull();
      table.string( 'email' ).notNull();
      table.string( 'password' ).notNull();
    } ),
    knex.schema.createTable( 'recipes', ( table ) => {
      table.increments( 'id' ).primary();
      table.string( 'name' ).notNull();
      table.string( 'author' ).notNull();
      table.string( 'category' );
      table.string( 'description' );
      table.integer( 'duration' );
      table.string( 'image_url' );
      table.string( 'note' );
      table.integer( 'user_id' ).references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' );
    } ),

    knex.schema.createTable( 'ingredients', ( table ) => {
      table.increments( 'id' ).primary();
      table.string( 'name' ).notNull();
      table.string( 'units' ).notNull();
      table.float( 'quantity' ).notNull();
      table.integer( 'recipe_id' ).references( 'id' ).inTable( 'recipes' ).onDelete( 'CASCADE' );
      table.integer( 'user_id' ).references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' );
    } ),

    knex.schema.createTable( 'directions', ( table ) => {
      table.increments( 'id' ).primary();
      table.string( 'description' ).notNull();
      table.integer( 'recipe_id' ).references( 'id' ).inTable( 'recipes' ).onDelete( 'CASCADE' );
    } ),

    knex.schema.createTable( 'favorites', ( table ) => {
      table.increments( 'id' ).primary();
      table.integer( 'user_id' ).references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' );
      table.integer( 'recipe_id' ).references( 'id' ).inTable( 'recipes' ).onDelete( 'CASCADE' );
    } ),

  ] );
};

exports.down = function ( knex, Promise ) {
  return Promise.all( [

    knex.schema.dropTableIfExists( 'recipes' ),
    knex.schema.dropTableIfExists( 'ingredients' ),
    knex.schema.dropTableIfExists( 'recipe_ingredient' ),
    knex.schema.dropTableIfExists( 'favorites' ),
    knex.schema.dropTableIfExists( 'users' ),
  ] );
};

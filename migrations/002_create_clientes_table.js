/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('clientes', function (table) {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('cidade', 255);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('clientes');
};
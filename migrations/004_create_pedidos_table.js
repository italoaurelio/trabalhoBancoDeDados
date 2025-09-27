/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('pedidos', function (table) {
    table.increments('id').primary();
    table.date('data_pedido').notNullable();
    table.integer('id_cliente').unsigned().notNullable();
    table.decimal('valor_total', 10, 2).notNullable();
    table.timestamps(true, true);
    
    table.foreign('id_cliente').references('id').inTable('clientes').onDelete('RESTRICT').onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('pedidos');
};
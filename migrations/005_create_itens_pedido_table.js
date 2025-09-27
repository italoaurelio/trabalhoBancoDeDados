/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('itens_pedido', function (table) {
    table.integer('id_pedido').unsigned().notNullable();
    table.integer('id_produto').unsigned().notNullable();
    table.integer('quantidade').notNullable();
    table.decimal('preco_unitario', 10, 2).notNullable();
    table.timestamps(true, true);
    
    table.primary(['id_pedido', 'id_produto']);
    
    table.foreign('id_pedido').references('id').inTable('pedidos').onDelete('CASCADE').onUpdate('CASCADE');
    table.foreign('id_produto').references('id').inTable('produtos').onDelete('RESTRICT').onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('itens_pedido');
};
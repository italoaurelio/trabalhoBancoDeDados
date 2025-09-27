/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0;');
  
  try {
    await knex('itens_pedido').del();
    await knex('pedidos').del();
    await knex('produtos').del();
    await knex('clientes').del();
    await knex('marcas').del();
    
    await knex.raw('ALTER TABLE marcas AUTO_INCREMENT = 1;');
    await knex.raw('ALTER TABLE clientes AUTO_INCREMENT = 1;');
    await knex.raw('ALTER TABLE produtos AUTO_INCREMENT = 1;');
    await knex.raw('ALTER TABLE pedidos AUTO_INCREMENT = 1;');
    
    console.log('🗑️ Dados anteriores removidos com sucesso!');
    
  } finally {
    await knex.raw('SET FOREIGN_KEY_CHECKS = 1;');
  }
};
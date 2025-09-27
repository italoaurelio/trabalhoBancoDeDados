import db from '../config/database.js';

export class PedidosController {
  
  // GET /pedidos - Lista todos os pedidos com itens
  async listarTodos(request, reply) {
    try {
      const pedidos = await db('pedidos')
        .join('clientes', 'pedidos.id_cliente', 'clientes.id')
        .select(
          'pedidos.*',
          'clientes.nome as cliente_nome',
          'clientes.email as cliente_email',
          'clientes.cidade as cliente_cidade'
        )
        .orderBy('pedidos.id');
      
      // Busca os itens de cada pedido
      for (let pedido of pedidos) {
        pedido.itens = await db('itens_pedido')
          .join('produtos', 'itens_pedido.id_produto', 'produtos.id')
          .join('marcas', 'produtos.id_marca', 'marcas.id')
          .select(
            'itens_pedido.*',
            'produtos.nome as produto_nome',
            'produtos.preco as produto_preco_atual',
            'marcas.nome as marca_nome'
          )
          .where('itens_pedido.id_pedido', pedido.id);
      }
      
      reply.status(200).send({
        message: "Pedidos listados com sucesso",
        data: pedidos,
        error: false
      });
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }

  // GET /pedidos/:id - Lista o pedido com o id especificado com itens
  async obterPorId(request, reply) {
    try {
      const { id } = request.params;
      
      const pedido = await db('pedidos')
        .join('clientes', 'pedidos.id_cliente', 'clientes.id')
        .select(
          'pedidos.*',
          'clientes.nome as cliente_nome',
          'clientes.email as cliente_email',
          'clientes.cidade as cliente_cidade'
        )
        .where('pedidos.id', id)
        .first();
      
      if (!pedido) {
        return reply.status(404).send({
          message: "Pedido não encontrado",
          data: null,
          error: true
        });
      }

      // Busca os itens do pedido
      pedido.itens = await db('itens_pedido')
        .join('produtos', 'itens_pedido.id_produto', 'produtos.id')
        .join('marcas', 'produtos.id_marca', 'marcas.id')
        .select(
          'itens_pedido.*',
          'produtos.nome as produto_nome',
          'produtos.preco as produto_preco_atual',
          'marcas.nome as marca_nome'
        )
        .where('itens_pedido.id_pedido', pedido.id);

      reply.status(200).send({
        message: "Pedido encontrado com sucesso",
        data: pedido,
        error: false
      });
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }

  // GET /pedidos/cidade/:cidade - Lista todos os pedidos da cidade especificada
  async obterPorCidade(request, reply) {
    try {
      const { cidade } = request.params;
      
      const pedidos = await db('pedidos')
        .join('clientes', 'pedidos.id_cliente', 'clientes.id')
        .select(
          'pedidos.*',
          'clientes.nome as cliente_nome',
          'clientes.email as cliente_email',
          'clientes.cidade as cliente_cidade'
        )
        .where('clientes.cidade', cidade)
        .orderBy('pedidos.id');
      
      // Busca os itens de cada pedido
      for (let pedido of pedidos) {
        pedido.itens = await db('itens_pedido')
          .join('produtos', 'itens_pedido.id_produto', 'produtos.id')
          .join('marcas', 'produtos.id_marca', 'marcas.id')
          .select(
            'itens_pedido.*',
            'produtos.nome as produto_nome',
            'produtos.preco as produto_preco_atual',
            'marcas.nome as marca_nome'
          )
          .where('itens_pedido.id_pedido', pedido.id);
      }
      
      reply.status(200).send({
        message: `Pedidos da cidade ${cidade} listados com sucesso`,
        data: pedidos,
        error: false
      });
    } catch (error) {
      console.error('Erro ao buscar pedidos por cidade:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }

  // POST /pedidos - Gera um novo pedido com itens
  async criar(request, reply) {
    try {
      const { id_cliente, data_pedido, itens } = request.body;
      
      // Validações básicas
      if (!id_cliente || !data_pedido || !itens || !Array.isArray(itens) || itens.length === 0) {
        return reply.status(400).send({
          message: "Dados obrigatórios: id_cliente, data_pedido, itens (array não vazio)",
          data: null,
          error: true
        });
      }

      // Verifica se o cliente existe
      const cliente = await db('clientes').where('id', id_cliente).first();
      if (!cliente) {
        return reply.status(412).send({
          message: "Cliente não encontrado",
          data: null,
          error: true
        });
      }

      // Inicia uma transação
      const resultado = await db.transaction(async (trx) => {
        let valorTotal = 0;

        // Valida produtos e calcula valor total
        for (let item of itens) {
          const { id_produto, quantidade } = item;
          
          if (!id_produto || !quantidade || quantidade <= 0) {
            throw new Error("Cada item deve ter id_produto e quantidade válidos");
          }

          const produto = await trx('produtos').where('id', id_produto).first();
          if (!produto) {
            throw new Error(`Produto com ID ${id_produto} não encontrado`);
          }

          if (produto.estoque < quantidade) {
            throw new Error(`Estoque insuficiente para o produto ${produto.nome}. Disponível: ${produto.estoque}`);
          }

          valorTotal += parseFloat(produto.preco) * parseInt(quantidade);
        }

        // Cria o pedido
        const [pedidoId] = await trx('pedidos').insert({
          id_cliente: parseInt(id_cliente),
          data_pedido,
          valor_total: valorTotal
        });

        // Insere os itens e atualiza estoque
        for (let item of itens) {
          const { id_produto, quantidade } = item;
          const produto = await trx('produtos').where('id', id_produto).first();

          // Insere item do pedido
          await trx('itens_pedido').insert({
            id_pedido: pedidoId,
            id_produto: parseInt(id_produto),
            quantidade: parseInt(quantidade),
            preco_unitario: parseFloat(produto.preco)
          });

          // Atualiza estoque
          await trx('produtos')
            .where('id', id_produto)
            .update({ estoque: produto.estoque - quantidade });
        }

        return pedidoId;
      });

      // Busca o pedido criado com todos os dados
      const pedidoCriado = await db('pedidos')
        .join('clientes', 'pedidos.id_cliente', 'clientes.id')
        .select(
          'pedidos.*',
          'clientes.nome as cliente_nome',
          'clientes.email as cliente_email',
          'clientes.cidade as cliente_cidade'
        )
        .where('pedidos.id', resultado)
        .first();

      // Busca os itens do pedido
      pedidoCriado.itens = await db('itens_pedido')
        .join('produtos', 'itens_pedido.id_produto', 'produtos.id')
        .join('marcas', 'produtos.id_marca', 'marcas.id')
        .select(
          'itens_pedido.*',
          'produtos.nome as produto_nome',
          'produtos.preco as produto_preco_atual',
          'marcas.nome as marca_nome'
        )
        .where('itens_pedido.id_pedido', resultado);

      reply.status(201).send({
        message: "Pedido criado com sucesso",
        data: pedidoCriado,
        error: false
      });
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      
      if (error.message.includes('não encontrado') || 
          error.message.includes('Estoque insuficiente') ||
          error.message.includes('deve ter id_produto')) {
        reply.status(412).send({
          message: error.message,
          data: null,
          error: true
        });
      } else {
        reply.status(500).send({
          message: "Erro interno do servidor",
          data: null,
          error: true
        });
      }
    }
  }
}
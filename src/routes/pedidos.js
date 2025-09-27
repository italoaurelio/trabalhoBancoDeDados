import { PedidosController } from '../controllers/pedidosController.js';
import { inlineSchemas } from '../schemas/swagger.js';

const pedidosController = new PedidosController();

export default async function pedidosRoutes(fastify, options) {
  // GET /pedidos - Lista todos os pedidos com itens
  fastify.get('/', {
    schema: {
      description: 'Lista todos os pedidos com seus respectivos itens',
      tags: ['Pedidos'],
      response: {
        200: inlineSchemas.pedidosListResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, pedidosController.listarTodos);

  // GET /pedidos/:id - Lista o pedido com o id especificado com itens
  fastify.get('/:id', {
    schema: {
      description: 'Busca um pedido específico pelo ID com todos os itens',
      tags: ['Pedidos'],
      params: {
        type: 'object',
        properties: {
          id: { 
            type: 'integer',
            description: 'ID do pedido'
          }
        },
        required: ['id']
      },
      response: {
        200: inlineSchemas.pedidosListResponse,
        404: inlineSchemas.errorResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, pedidosController.obterPorId);

  // GET /pedidos/cidade/:cidade - Lista todos os pedidos da cidade especificada
  fastify.get('/cidade/:cidade', {
    schema: {
      description: 'Lista todos os pedidos de uma cidade específica',
      tags: ['Pedidos'],
      params: {
        type: 'object',
        properties: {
          cidade: { 
            type: 'string',
            description: 'Nome da cidade'
          }
        },
        required: ['cidade']
      },
      response: {
        200: inlineSchemas.pedidosListResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, pedidosController.obterPorCidade);

  // POST /pedidos - Gera um novo pedido
  fastify.post('/', {
    schema: {
      description: 'Cria um novo pedido com itens. Atualiza automaticamente o estoque dos produtos.',
      tags: ['Pedidos'],
      body: {
        type: 'object',
        properties: {
          id_cliente: { 
            type: 'integer', 
            description: 'ID do cliente que está fazendo o pedido'
          },
          data_pedido: { 
            type: 'string', 
            format: 'date',
            description: 'Data do pedido (formato YYYY-MM-DD)'
          },
          itens: {
            type: 'array',
            description: 'Lista de itens do pedido',
            items: {
              type: 'object',
              properties: {
                id_produto: { 
                  type: 'integer',
                  description: 'ID do produto'
                },
                quantidade: { 
                  type: 'integer',
                  description: 'Quantidade do produto'
                }
              },
              required: ['id_produto', 'quantidade']
            }
          }
        },
        required: ['id_cliente', 'data_pedido', 'itens']
      },
      response: {
        201: inlineSchemas.pedidosListResponse,
        400: inlineSchemas.errorResponse,
        412: inlineSchemas.errorResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, pedidosController.criar);
}
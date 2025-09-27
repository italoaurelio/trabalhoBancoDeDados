import { ClientesController } from '../controllers/clientesController.js';
import { inlineSchemas } from '../schemas/swagger.js';

const clientesController = new ClientesController();

export default async function clientesRoutes(fastify, options) {
  // GET /clientes - Lista todos os clientes
  fastify.get('/', {
    schema: {
      description: 'Lista todos os clientes cadastrados',
      tags: ['Clientes'],
      response: {
        200: inlineSchemas.clientesListResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, clientesController.listarTodos);

  // GET /clientes/:id - Lista o cliente com o id especificado
  fastify.get('/:id', {
    schema: {
      description: 'Busca um cliente específico pelo ID',
      tags: ['Clientes'],
      params: {
        type: 'object',
        properties: {
          id: { 
            type: 'integer',
            description: 'ID do cliente'
          }
        },
        required: ['id']
      },
      response: {
        200: inlineSchemas.clienteResponse,
        404: inlineSchemas.errorResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, clientesController.obterPorId);

  // POST /clientes - Cadastra um novo cliente
  fastify.post('/', {
    schema: {
      description: 'Cadastra um novo cliente',
      tags: ['Clientes'],
      body: {
        type: 'object',
        properties: {
          nome: { 
            type: 'string', 
            description: 'Nome completo do cliente'
          },
          email: { 
            type: 'string',
            format: 'email', 
            description: 'E-mail do cliente (deve ser único)'
          },
          cidade: { 
            type: 'string', 
            description: 'Cidade do cliente'
          }
        },
        required: ['nome', 'email']
      },
      response: {
        201: inlineSchemas.clienteResponse,
        400: inlineSchemas.errorResponse,
        412: inlineSchemas.errorResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, clientesController.criar);
}
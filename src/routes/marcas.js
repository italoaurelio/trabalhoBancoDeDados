import { MarcasController } from '../controllers/marcasController.js';
import { inlineSchemas } from '../schemas/swagger.js';

const marcasController = new MarcasController();

export default async function marcasRoutes(fastify, options) {
  // GET /marcas - Lista todas as marcas
  fastify.get('/', {
    schema: {
      description: 'Lista todas as marcas cadastradas',
      tags: ['Marcas'],
      response: {
        200: inlineSchemas.marcasListResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, marcasController.listarTodas);

  // GET /marcas/:id - Lista a marca com o id especificado
  fastify.get('/:id', {
    schema: {
      description: 'Busca uma marca específica pelo ID',
      tags: ['Marcas'],
      params: {
        type: 'object',
        properties: {
          id: { 
            type: 'integer',
            description: 'ID da marca'
          }
        },
        required: ['id']
      },
      response: {
        200: inlineSchemas.marcaResponse,
        404: inlineSchemas.errorResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, marcasController.obterPorId);

  // DELETE /marcas/:id - Exclui a marca com o id especificado
  fastify.delete('/:id', {
    schema: {
      description: 'Exclui uma marca pelo ID (se não houver produtos associados)',
      tags: ['Marcas'],
      params: {
        type: 'object',
        properties: {
          id: { 
            type: 'integer',
            description: 'ID da marca'
          }
        },
        required: ['id']
      },
      response: {
        204: {
          description: 'Marca excluída com sucesso',
          type: 'null'
        },
        404: inlineSchemas.errorResponse,
        412: inlineSchemas.errorResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, marcasController.excluir);
}
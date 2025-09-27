import { ProdutosController } from '../controllers/produtosController.js';
import { inlineSchemas } from '../schemas/swagger.js';

const produtosController = new ProdutosController();

export default async function produtosRoutes(fastify, options) {
  // GET /produtos - Lista todos os produtos
  fastify.get('/', {
    schema: {
      description: 'Lista todos os produtos cadastrados com informações das marcas',
      tags: ['Produtos'],
      response: {
        200: inlineSchemas.produtosListResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, produtosController.listarTodos);

  // GET /produtos/:id - Lista o produto com o id especificado
  fastify.get('/:id', {
    schema: {
      description: 'Busca um produto específico pelo ID com informações da marca',
      tags: ['Produtos'],
      params: {
        type: 'object',
        properties: {
          id: { 
            type: 'integer',
            description: 'ID do produto'
          }
        },
        required: ['id']
      },
      response: {
        200: inlineSchemas.produtoResponse,
        404: inlineSchemas.errorResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, produtosController.obterPorId);

  // POST /produtos - Cadastra um novo produto
  fastify.post('/', {
    schema: {
      description: 'Cadastra um novo produto',
      tags: ['Produtos'],
      body: {
        type: 'object',
        properties: {
          nome: { 
            type: 'string', 
            description: 'Nome do produto'
          },
          preco: { 
            type: 'number', 
            description: 'Preço do produto'
          },
          estoque: { 
            type: 'integer', 
            description: 'Quantidade em estoque'
          },
          id_marca: { 
            type: 'integer', 
            description: 'ID da marca do produto'
          }
        },
        required: ['nome', 'preco', 'estoque', 'id_marca']
      },
      response: {
        201: inlineSchemas.produtoResponse,
        400: inlineSchemas.errorResponse,
        412: inlineSchemas.errorResponse,
        500: inlineSchemas.errorResponse
      }
    }
  }, produtosController.criar);
}
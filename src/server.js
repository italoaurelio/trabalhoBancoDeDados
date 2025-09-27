import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import dotenv from 'dotenv';

// Import das rotas
import marcasRoutes from './routes/marcas.js';
import produtosRoutes from './routes/produtos.js';
import clientesRoutes from './routes/clientes.js';
import pedidosRoutes from './routes/pedidos.js';

// Carrega variáveis de ambiente
dotenv.config();

const fastify = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  }
});

// Registra CORS
await fastify.register(cors, {
  origin: true
});

// Registra Swagger
await fastify.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'API Trabalho Banco de Dados',
      description: 'API REST para gerenciamento de marcas, produtos, clientes e pedidos',
      version: '1.0.0',
      contact: {
        name: 'Suporte API',
        email: 'suporte@api.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Servidor de desenvolvimento'
      }
    ],
    tags: [
      {
        name: 'Marcas',
        description: 'Operações relacionadas às marcas'
      },
      {
        name: 'Produtos',
        description: 'Operações relacionadas aos produtos'
      },
      {
        name: 'Clientes',
        description: 'Operações relacionadas aos clientes'
      },
      {
        name: 'Pedidos',
        description: 'Operações relacionadas aos pedidos'
      },
      {
        name: 'Sistema',
        description: 'Operações do sistema'
      }
    ]
  }
});

// Registra Swagger UI
await fastify.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
});

// Registra as rotas
await fastify.register(marcasRoutes, { prefix: '/marcas' });
await fastify.register(produtosRoutes, { prefix: '/produtos' });
await fastify.register(clientesRoutes, { prefix: '/clientes' });
await fastify.register(pedidosRoutes, { prefix: '/pedidos' });

// Rota de health check
fastify.get('/', {
  schema: {
    description: 'Health check da API',
    tags: ['Sistema'],
    response: {
      200: {
        description: 'API funcionando corretamente',
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              timestamp: { type: 'string' },
              version: { type: 'string' }
            }
          },
          error: { type: 'boolean' }
        }
      }
    }
  }
}, async (request, reply) => {
  return {
    message: "API Trabalho Banco de Dados está funcionando!",
    data: {
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    },
    error: false
  };
});

// Handler de erro global
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  
  // Se é um erro de validação do Fastify
  if (error.validation) {
    reply.status(400).send({
      message: "Dados inválidos na requisição",
      data: error.validation,
      error: true
    });
    return;
  }

  // Erro genérico
  reply.status(500).send({
    message: "Erro interno do servidor",
    data: null,
    error: true
  });
});

// Handler para rotas não encontradas
fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    message: "Rota não encontrada",
    data: null,
    error: true
  });
});

// Função para iniciar o servidor
const start = async () => {
  try {
    const port = process.env.PORT || 8000;
    const host = '0.0.0.0';
    
    await fastify.listen({ port, host });
    fastify.log.info(`🚀 Servidor rodando na porta ${port}`);
    fastify.log.info(`� Documentação Swagger disponível em: http://localhost:${port}/docs`);
    fastify.log.info(`💡 Health check disponível em: http://localhost:${port}/`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
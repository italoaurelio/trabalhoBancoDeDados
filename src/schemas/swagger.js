export const swaggerSchemas = {
  StandardResponse: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Mensagem descritiva da operação'
      },
      data: {
        oneOf: [
          { type: 'object' },
          { type: 'array' },
          { type: 'null' }
        ],
        description: 'Dados retornados pela operação'
      },
      error: {
        type: 'boolean',
        description: 'Indica se ocorreu erro na operação'
      }
    },
    required: ['message', 'data', 'error']
  },

  Marca: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nome: { type: 'string', example: 'Apple' },
      site: { type: 'string', example: 'apple.com' },
      telefone: { type: 'string', example: '0800-761-0867' },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' }
    }
  },

  Produto: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nome: { type: 'string', example: 'iPhone 15 Pro Max' },
      preco: { type: 'number', format: 'float', example: 9999.00 },
      estoque: { type: 'integer', example: 160 },
      id_marca: { type: 'integer', example: 1 },
      marca_nome: { type: 'string', example: 'Apple' },
      marca_site: { type: 'string', example: 'apple.com' },
      marca_telefone: { type: 'string', example: '0800-761-0867' },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' }
    }
  },

  Cliente: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nome: { type: 'string', example: 'Daniel Ventura' },
      email: { type: 'string', format: 'email', example: 'daniel@email.com' },
      cidade: { type: 'string', example: 'Juiz de Fora' },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' }
    }
  },

  ItemPedido: {
    type: 'object',
    properties: {
      id_pedido: { type: 'integer', example: 1 },
      id_produto: { type: 'integer', example: 3 },
      quantidade: { type: 'integer', example: 1 },
      preco_unitario: { type: 'number', format: 'float', example: 7299.00 },
      produto_nome: { type: 'string', example: 'iPhone 15' },
      produto_preco_atual: { type: 'number', format: 'float', example: 7299.00 },
      marca_nome: { type: 'string', example: 'Apple' }
    }
  },

  Pedido: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      data_pedido: { type: 'string', format: 'date', example: '2025-09-17' },
      id_cliente: { type: 'integer', example: 1 },
      valor_total: { type: 'number', format: 'float', example: 11898.00 },
      cliente_nome: { type: 'string', example: 'Daniel Ventura' },
      cliente_email: { type: 'string', example: 'daniel@email.com' },
      cliente_cidade: { type: 'string', example: 'Juiz de Fora' },
      itens: {
        type: 'array',
        items: { $ref: '#/components/schemas/ItemPedido' }
      },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' }
    }
  },

  Error: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: { type: 'null' },
      error: { type: 'boolean', example: true }
    }
  }
};

// Schemas inline para uso nas rotas (sem $ref para evitar problemas)
export const inlineSchemas = {
  marcasListResponse: {
    description: 'Lista de marcas retornada com sucesso',
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Apple' },
            site: { type: 'string', example: 'apple.com' },
            telefone: { type: 'string', example: '0800-761-0867' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      },
      error: { type: 'boolean', example: false }
    }
  },

  marcaResponse: {
    description: 'Marca encontrada com sucesso',
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nome: { type: 'string', example: 'Apple' },
          site: { type: 'string', example: 'apple.com' },
          telefone: { type: 'string', example: '0800-761-0867' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' }
        }
      },
      error: { type: 'boolean', example: false }
    }
  },

  produtosListResponse: {
    description: 'Lista de produtos retornada com sucesso',
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'iPhone 15 Pro Max' },
            preco: { type: 'number', format: 'float', example: 9999.00 },
            estoque: { type: 'integer', example: 160 },
            id_marca: { type: 'integer', example: 1 },
            marca_nome: { type: 'string', example: 'Apple' },
            marca_site: { type: 'string', example: 'apple.com' },
            marca_telefone: { type: 'string', example: '0800-761-0867' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      },
      error: { type: 'boolean', example: false }
    }
  },

  produtoResponse: {
    description: 'Produto encontrado com sucesso',
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nome: { type: 'string', example: 'iPhone 15 Pro Max' },
          preco: { type: 'number', format: 'float', example: 9999.00 },
          estoque: { type: 'integer', example: 160 },
          id_marca: { type: 'integer', example: 1 },
          marca_nome: { type: 'string', example: 'Apple' },
          marca_site: { type: 'string', example: 'apple.com' },
          marca_telefone: { type: 'string', example: '0800-761-0867' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' }
        }
      },
      error: { type: 'boolean', example: false }
    }
  },

  clientesListResponse: {
    description: 'Lista de clientes retornada com sucesso',
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Daniel Ventura' },
            email: { type: 'string', format: 'email', example: 'daniel@email.com' },
            cidade: { type: 'string', example: 'Juiz de Fora' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      },
      error: { type: 'boolean', example: false }
    }
  },

  clienteResponse: {
    description: 'Cliente encontrado com sucesso',
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nome: { type: 'string', example: 'Daniel Ventura' },
          email: { type: 'string', format: 'email', example: 'daniel@email.com' },
          cidade: { type: 'string', example: 'Juiz de Fora' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' }
        }
      },
      error: { type: 'boolean', example: false }
    }
  },

  pedidosListResponse: {
    description: 'Lista de pedidos retornada com sucesso',
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            data_pedido: { type: 'string', format: 'date', example: '2025-09-17' },
            id_cliente: { type: 'integer', example: 1 },
            valor_total: { type: 'number', format: 'float', example: 11898.00 },
            cliente_nome: { type: 'string', example: 'Daniel Ventura' },
            cliente_email: { type: 'string', example: 'daniel@email.com' },
            cliente_cidade: { type: 'string', example: 'Juiz de Fora' },
            itens: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id_pedido: { type: 'integer', example: 1 },
                  id_produto: { type: 'integer', example: 3 },
                  quantidade: { type: 'integer', example: 1 },
                  preco_unitario: { type: 'number', format: 'float', example: 7299.00 },
                  produto_nome: { type: 'string', example: 'iPhone 15' },
                  produto_preco_atual: { type: 'number', format: 'float', example: 7299.00 },
                  marca_nome: { type: 'string', example: 'Apple' }
                }
              }
            },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      },
      error: { type: 'boolean', example: false }
    }
  },

  errorResponse: {
    description: 'Resposta de erro',
    type: 'object',
    properties: {
      message: { type: 'string' },
      data: { type: 'null' },
      error: { type: 'boolean', example: true }
    }
  }
};
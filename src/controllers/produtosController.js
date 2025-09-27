import db from '../config/database.js';

export class ProdutosController {
  
  // GET /produtos - Lista todos os produtos
  async listarTodos(request, reply) {
    try {
      const produtos = await db('produtos')
        .join('marcas', 'produtos.id_marca', 'marcas.id')
        .select(
          'produtos.*',
          'marcas.nome as marca_nome',
          'marcas.site as marca_site',
          'marcas.telefone as marca_telefone'
        )
        .orderBy('produtos.id');
      
      reply.status(200).send({
        message: "Produtos listados com sucesso",
        data: produtos,
        error: false
      });
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }

  // GET /produtos/:id - Lista o produto com o id especificado
  async obterPorId(request, reply) {
    try {
      const { id } = request.params;
      const produto = await db('produtos')
        .join('marcas', 'produtos.id_marca', 'marcas.id')
        .select(
          'produtos.*',
          'marcas.nome as marca_nome',
          'marcas.site as marca_site',
          'marcas.telefone as marca_telefone'
        )
        .where('produtos.id', id)
        .first();
      
      if (!produto) {
        return reply.status(404).send({
          message: "Produto não encontrado",
          data: null,
          error: true
        });
      }

      reply.status(200).send({
        message: "Produto encontrado com sucesso",
        data: produto,
        error: false
      });
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }

  // POST /produtos - Cadastra um novo produto
  async criar(request, reply) {
    try {
      const { nome, preco, estoque, id_marca } = request.body;
      
      // Validações básicas
      if (!nome || !preco || estoque === undefined || !id_marca) {
        return reply.status(400).send({
          message: "Dados obrigatórios: nome, preco, estoque, id_marca",
          data: null,
          error: true
        });
      }

      // Verifica se a marca existe
      const marca = await db('marcas').where('id', id_marca).first();
      if (!marca) {
        return reply.status(412).send({
          message: "Marca não encontrada",
          data: null,
          error: true
        });
      }

      const [produtoId] = await db('produtos').insert({
        nome,
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        id_marca: parseInt(id_marca)
      });

      const produtoCriado = await db('produtos')
        .join('marcas', 'produtos.id_marca', 'marcas.id')
        .select(
          'produtos.*',
          'marcas.nome as marca_nome',
          'marcas.site as marca_site',
          'marcas.telefone as marca_telefone'
        )
        .where('produtos.id', produtoId)
        .first();

      reply.status(201).send({
        message: "Produto criado com sucesso",
        data: produtoCriado,
        error: false
      });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }
}
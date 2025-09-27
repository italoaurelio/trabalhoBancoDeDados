import db from '../config/database.js';

export class ClientesController {
  
  // GET /clientes - Lista todos os clientes
  async listarTodos(request, reply) {
    try {
      const clientes = await db('clientes').select('*').orderBy('id');
      
      reply.status(200).send({
        message: "Clientes listados com sucesso",
        data: clientes,
        error: false
      });
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }

  // GET /clientes/:id - Lista o cliente com o id especificado
  async obterPorId(request, reply) {
    try {
      const { id } = request.params;
      const cliente = await db('clientes').where('id', id).first();
      
      if (!cliente) {
        return reply.status(404).send({
          message: "Cliente não encontrado",
          data: null,
          error: true
        });
      }

      reply.status(200).send({
        message: "Cliente encontrado com sucesso",
        data: cliente,
        error: false
      });
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }

  // POST /clientes - Cadastra um novo cliente
  async criar(request, reply) {
    try {
      const { nome, email, cidade } = request.body;
      
      // Validações básicas
      if (!nome || !email) {
        return reply.status(400).send({
          message: "Dados obrigatórios: nome, email",
          data: null,
          error: true
        });
      }

      // Verifica se o email já existe
      const clienteExistente = await db('clientes').where('email', email).first();
      if (clienteExistente) {
        return reply.status(412).send({
          message: "E-mail já cadastrado",
          data: null,
          error: true
        });
      }

      const [clienteId] = await db('clientes').insert({
        nome,
        email,
        cidade: cidade || null
      });

      const clienteCriado = await db('clientes').where('id', clienteId).first();

      reply.status(201).send({
        message: "Cliente criado com sucesso",
        data: clienteCriado,
        error: false
      });
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }
}
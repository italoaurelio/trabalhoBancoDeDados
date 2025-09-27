import db from '../config/database.js';

export class MarcasController {
  
  // GET /marcas - Lista todas as marcas
  async listarTodas(request, reply) {
    try {
      const marcas = await db('marcas').select('*').orderBy('id');
      
      reply.status(200).send({
        message: "Marcas listadas com sucesso",
        data: marcas,
        error: false
      });
    } catch (error) {
      console.error('Erro ao listar marcas:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }

  // GET /marcas/:id - Lista a marca com o id especificado
  async obterPorId(request, reply) {
    try {
      const { id } = request.params;
      const marca = await db('marcas').where('id', id).first();
      
      if (!marca) {
        return reply.status(404).send({
          message: "Marca não encontrada",
          data: null,
          error: true
        });
      }

      reply.status(200).send({
        message: "Marca encontrada com sucesso",
        data: marca,
        error: false
      });
    } catch (error) {
      console.error('Erro ao buscar marca:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }

  // DELETE /marcas/:id - Exclui a marca com o id especificado
  async excluir(request, reply) {
    try {
      const { id } = request.params;
      
      // Verifica se a marca existe
      const marca = await db('marcas').where('id', id).first();
      if (!marca) {
        return reply.status(404).send({
          message: "Marca não encontrada",
          data: null,
          error: true
        });
      }

      // Verifica se há produtos associados
      const produtosAssociados = await db('produtos').where('id_marca', id).count('id as total').first();
      if (produtosAssociados.total > 0) {
        return reply.status(412).send({
          message: "Não é possível excluir a marca pois existem produtos associados a ela",
          data: null,
          error: true
        });
      }

      await db('marcas').where('id', id).del();
      
      reply.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir marca:', error);
      reply.status(500).send({
        message: "Erro interno do servidor",
        data: null,
        error: true
      });
    }
  }
}
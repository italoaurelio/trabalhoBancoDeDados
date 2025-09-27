# Trabalho de banco de dados

## Equipe: 

-   Ítalo Aurélio de Paula Vieira
-   Roberta Ferreira Antunes
-   Davi Martins dos Santos

---

## Como executar o projeto

### Início rápido:
```bash
# 1. Instalar dependências
npm install

# 2. Configurar banco de dados no arquivo .env
# Edite o arquivo .env com suas credenciais do MySQL

# 3. Executar migrations
npm run migrate:latest

# 4. Popular tabelas com dados
npm run seed:run

# 5. Iniciar servidor
npm run dev
```

### 📚 Acessar documentação interativa:
**Swagger UI:** http://localhost:8000/docs

**API Base:** http://localhost:8000

---

## 1 - Configuração inicial

- [x] Configurar o ambiente de desenvolvimento Node.js
- [x] Instalar e configurar as dependências necessárias, incluindo Knex.js, o driver do MySQL e o framework da API (como Fastify)
- [x] Criar o arquivo de configuração do Knex.js (knexfile.js), especificando aconexão com o banco de dados MySQL

## 2 - Migrations e Seeds

- [x] Criação das migrations para as seguintes tabelas, com atenção especial aos relacionamentos:
    - [x] marcas
    - [x] produtos
    - [x] clientes
    - [x] pedidos
    - [x] itens_pedidos
- [x] As tabelas deverão conter os campos necessários para armazenar os dados dos arquivos CSV fornecidos (por exemplo, marcas.csv, produtos.csv)
- [x] Criação dos seeds para popular as tabelas. Os dados do seed estão contidos nos arquivos .csv
- [x] Atenção aos Relacionamentos: Certifique-se de que os relacionamentos entre as tabelas estejam corretamente definidos nas migrations (ex: produtos se relacionando com marcas, pedidos com clientes, e itens_pedidos com pedidos e produtos)

## 3 - Desenvolvimento das Rotas da API

- [x] Após a configuração inicial, as migrations e os seeds estarem prontos e executados, o código deve ser commitado com a mensagem: "feat: Configurações iniciais, migrations e seeds"

- [x] Em seguida, a API deverá implementar as seguintes rotas, utilizando o Knex.js para todas as interações com o banco de dados:
A estrutura de resposta deverá conter além do HTTP CODE( 200, 204, 400, 412, 500, etc.. ) referente a resposta, o seguinte formato:

```json
{
message: “”,
data: [Array] ou {Object},
error: false
}
```

- Tabela de marcas:
    • GET /marcas: Lista todas as marcas.
    • GET /marcas/:id: Lista a marca com o id especificado.
    • DELETE /marcas/:id: Exclui a marca com o id especificado.

- Tabela de produtos:
    • GET /produtos: Lista todos os produtos.
    • GET /produtos/:id: Lista o produto com o id especificado.
    • POST /produtos: Cadastra um novo produto.

- Tabela de clientes:
    • GET /clientes: Lista todos os clientes.
    • GET /clientes/:id: Lista o cliente com o id especificado.
    • POST /clientes: Cadastra um novo cliente.

- Tabela de pedidos:
    • GET /pedidos: Lista todos os pedidos. Cada pedido deve incluir uma
    propriedade itens que contenha todos os itens_pedidos relacionados
    a ele.
    • GET /pedidos/:id: Lista o pedido com o id especificado. O pedido
    deve incluir a propriedade itens com os itens_pedidos relacionados.
    • GET /pedidos/:cidade: Lista todos os pedidos da cidade especificada.
    Cada pedido deve incluir a propriedade itens com os itens_pedidos
    relacionados.
    • POST /pedidos: Gera um novo pedido. Os itens do pedido enviados
    na requisição devem ser inseridos na tabela itens_pedidos e
    associados ao novo pedido.
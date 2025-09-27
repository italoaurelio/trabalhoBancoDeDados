# Trabalho de banco de dados

## Equipe: 

-   Ítalo Aurélio de Paula Vieira
-   Roberta Ferreira Antunes
-   Davi Martins dos Santos

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
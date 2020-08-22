# Node-Rest-Database

Serviço de comunicação com banco de dados via Node + RESTapi.
Projeto feito com base no https://github.com/bezkoder/nodejs-express-sequelize-mysql

### Pré-Requisitos

Necessário ter instalado banco MySQL para testes.
Altere o arquivo db.config.js com os parâmetros do banco em questão para comunicação.
Altere a porta no arquivo server.js para execução.
Este projeto já possui comunicação com MySQL e MariaDB, quaisquer outros bancos deverão ser implementados.

### Como usar?

Execute yarn install na pasta raiz do projeto.
Em seguida execute node server.js para iniciar o serviço. Ele está disponível na porta informada no item acima.
Execute as requisições REST via aplicação final ou Postman para testes.

### Exemplos

#### Criando um novo Tutorial:

Execute um POST para http://localhost:8080/api/tutorials com o body:
{
"title": "React: React Tut #2",
"description": "Tut#2 description"
}

Resposta esperada:
{
"id": 2,
"title": "React: React Tut #2",
"description": "Tut#2 description",
"published": false,
"updatedAt": "2020-08-22T20:14:39.515Z",
"createdAt": "2020-08-22T20:14:39.515Z"
}

#### Buscando um Tutorial:

Execute um GET para http://localhost:8080/api/tutorials/id onde o _id_ é específicamente o PK da tabela.

GET http://localhost:8080/api/tutorials/1
Resposta esperada:
{
"id": 1,
"title": "React: React Tut #2",
"description": "Tut#2 description",
"published": false,
"createdAt": "2020-08-22T20:31:02.000Z",
"updatedAt": "2020-08-22T20:31:02.000Z"
}

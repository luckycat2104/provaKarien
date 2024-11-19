// Importa o módulo 'express' para criar um servidor web
const express = require('express');

// Importa o módulo 'body-parser' para processar dados do corpo das requisições
const bodyParser = require('body-parser');

// Importa as rotas definidas em outro arquivo
const routes = require('./routes');

// Importa o módulo 'cors' para habilitar CORS 
const cors = require('cors');

// Cria uma instância do aplicativo Express
const app = express();

// Configura o middleware para analisar JSON no corpo das requisições
app.use(bodyParser.json());

// Habilita CORS para permitir requisições de outros domínios
app.use(cors());

// Usa as rotas definidas em 'routes.js' para o caminho raiz ('/')
app.use('/', routes);

// Define a porta em que o servidor irá escutar requisições
const port = 3000;

// Inicia o servidor na porta definida e imprime uma mensagem no console
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
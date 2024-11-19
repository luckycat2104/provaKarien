// Importa o módulo 'express' para criar um roteador
const express = require('express'); 

// Cria uma instância do roteador do Express
const router = express.Router(); 

// Importa o controlador que contém a lógica para as rotas
const controller = require('./controller'); 

// Define uma rota GET para listar todos os veículos, chamando o método getVeiculos do controlador
router.get('/veiculos', controller.getVeiculos); 

// Define uma rota GET para buscar um veículo específico pelo placa, chamando o método getVeiculosByPlaca do controlador
router.get('/veiculos/:placa', controller.getVeiculosByPlaca); 

// Define uma rota POST para criar um novo veículo, chamando o método createVeiculos do controlador
router.post('/veiculos', controller.createVeiculos); 

// Define uma rota PUT para atualizar um veículo existente pelo placa, chamando o método updateVeiculos do controlador
router.put('/veiculos/:placa', controller.updateVeiculos); 

// Define uma rota DELETE para remover um veículo específico pelo placa, chamando o método deleteVeiculos do controlador
router.delete('/veiculos/:placa', controller.deleteVeiculos); 

// Exporta o roteador para ser utilizado em outras partes da aplicação
module.exports = router;
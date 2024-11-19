// Array que armazena os veículos
const veiculos = []; 

// Função para obter todos os veículos
function getVeiculos(req, res) { 
    res.json(veiculos); // Retorna a lista de veículos como resposta JSON
} 

// Função para obter um veículo específico pela placa
function getVeiculosByPlaca(req, res) {
    const { placa } = req.params; // Extrai a placa da URL
    const veiculo = veiculos.find(v => v.placa === placa); // Busca o veículo pela placa
    if (veiculo) { 
        res.json(veiculo); // Retorna o veículo encontrado como resposta JSON
    } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna 404 se não encontrado
    } 
} 

// Função para criar um novo veículo
function createVeiculos(req, res) { 
    const { placa, marca, modelo, ano } = req.body; // Extrai os dados do veículo do corpo da requisição

    const novoVeiculo = { placa, marca, modelo, ano }; // Cria um novo objeto veiculo
    veiculos.push(novoVeiculo); // Adiciona o novo veículo ao array
    res.status(201).json({ message: 'Veículo cadastrado com sucesso.' }); // Retorna 201 indicando sucesso
} 

// Função para atualizar informações de um veículo
function updateVeiculos(req, res) { 
    const { placa } = req.params; // Extrai a placa da URL
    const { marca, modelo, ano } = req.body; // Extrai os dados atualizados do corpo da requisição
    const veiculo = veiculos.find(v => v.placa === placa); // Busca o veículo pela placa

    if (veiculo) { 
        // Atualiza os campos do veículo, se novos valores forem fornecidos
        veiculo.marca = marca || veiculo.marca; 
        veiculo.modelo = modelo || veiculo.modelo; 
        veiculo.ano = ano || veiculo.ano; 
        res.json({ message: 'Informações do veículo atualizadas com sucesso.' }); // Retorna confirmação de sucesso
    } else { 
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna 404 se não encontrado
    } 
} 

// Função para excluir um veículo
function deleteVeiculos(req, res) { 
    const { placa } = req.params; // Extrai a placa da URL
    const veiculosIndex = veiculos.findIndex(v => v.placa === placa); // Encontra o índice do veículo

    if (veiculosIndex !== -1) { 
        veiculos.splice(veiculosIndex, 1); // Remove o veículo do array
        res.json({ message: 'Veículo excluído com sucesso.' }); // Retorna confirmação de sucesso
    } else { 
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna 404 se não encontrado
    } 
} 

// Exporta as funções para serem utilizadas em outras partes da aplicação
module.exports = { 
    getVeiculos, 
    getVeiculosByPlaca, 
    createVeiculos, 
    updateVeiculos, 
    deleteVeiculos 
};
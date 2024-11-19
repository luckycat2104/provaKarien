import React, { useState, useEffect } from 'react'; // Importa React e hooks
import axios from 'axios'; // Importa axios para fazer requisições HTTP
import './App.css'; // Importa o arquivo CSS para estilos

const App = () => {
  // Estado para armazenar a lista de veículos
  const [veiculos, setVeiculos] = useState([]);
  
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: ''
  });
  
  // Estado para controlar se estamos editando um veículo
  const [isEditing, setIsEditing] = useState(false);

  // useEffect para carregar os veículos ao montar o componente
  useEffect(() => {
    fetchVeiculos(); // Chama a função para buscar veículos
  }, []);

  // Função para buscar veículos da API
  const fetchVeiculos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/veiculos'); // Faz a requisição GET
      setVeiculos(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error(error); // Trata erros no console
    }
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Atualiza o estado com o novo valor
  };

  // Função para criar um novo veículo
  const handleCreateVeiculos = async e => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      await axios.post('http://localhost:3000/veiculos', formData); // Faz a requisição POST
      setFormData({ placa: '', marca: '', modelo: '', ano: '' }); // Limpa o formulário
      fetchVeiculos(); // Atualiza a lista de veículos
    } catch (error) {
      console.error(error); // Trata erros no console
    }
  };

  // Função para atualizar um veículo existente
  const handleUpdateVeiculos = async e => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      await axios.put(`http://localhost:3000/veiculos/${formData.placa}`, formData); // Faz a requisição PUT
      setFormData({ placa: '', marca: '', modelo: '', ano: '' }); // Limpa o formulário
      setIsEditing(false); // Reseta o estado de edição
      fetchVeiculos(); // Atualiza a lista de veículos
    } catch (error) {
      console.error(error); // Trata erros no console
    }
  };

  // Função para excluir um veículo
  const handleDeleteVeiculos = async placa => {
    try {
      await axios.delete(`http://localhost:3000/veiculos/${placa}`); // Faz a requisição DELETE
      fetchVeiculos(); // Atualiza a lista de veículos
    } catch (error) {
      console.error(error); // Trata erros no console
    }
  };

  // Função para iniciar a edição de um veículo
  const handleEditVeiculo = veiculo => {
    setFormData({ // Atualiza o formulário com os dados do veículo a ser editado
      placa: veiculo.placa,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano
    });
    setIsEditing(true); // Define o estado de edição como verdadeiro
  };

  return (
    <div>
      <h1>Veículos</h1>
      <form onSubmit={isEditing ? handleUpdateVeiculos : handleCreateVeiculos}>
        <label>
          Placa:
          <input
            type="text"
            name="placa"
            value={formData.placa}
            onChange={handleInputChange}
            disabled={isEditing} // Desabilita o campo placa durante edição
          />
        </label>
        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Ano:
          <input
            type="text"
            name="ano"
            value={formData.ano}
            onChange={handleInputChange}
          />
        </label>
        {/* Botão para enviar o formulário */}
        <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      {/* Lista de veículos */}
      <ul>
        {veiculos.map(veiculo => (
          <li key={veiculo.placa}>
            {veiculo.placa} - {veiculo.marca} - {veiculo.modelo} - {veiculo.ano}
            <button onClick={() => handleEditVeiculo(veiculo)}>Editar</button>
            <button onClick={() => handleDeleteVeiculos(veiculo.placa)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
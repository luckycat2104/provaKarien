import { StrictMode } from 'react'; // Importa o StrictMode do React para ativar verificações adicionais durante o desenvolvimento
import { createRoot } from 'react-dom/client'; // Importa a função createRoot para renderizar o aplicativo
import './index.css'; // Importa o arquivo CSS para estilos globais
import App from './App.jsx'; // Importa o componente principal do aplicativo

// Cria e renderiza a raiz do aplicativo React
createRoot(document.getElementById('root')).render(
  <StrictMode> // Envolve o aplicativo em StrictMode
    <App /> // Renderiza o componente App
  </StrictMode>,
);
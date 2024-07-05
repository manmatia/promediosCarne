import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <button className="home-button" onClick={() => navigateTo('/promedio')}>
        Promedio
      </button>
      <button className="home-button" onClick={() => navigateTo('/edicion')}>
        Edición
      </button>
      <button className="home-button" onClick={() => navigateTo('/carga')}>
        Carga de Datos
      </button>
      <button className="home-button" onClick={() => navigateTo('/categoria')}>
        Categorías
      </button>
    </div>
  );
};

export default Home;



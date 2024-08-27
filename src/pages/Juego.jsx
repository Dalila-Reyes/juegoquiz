import React from 'react';
import './Juego.css'; // Archivo CSS para estilos
import { Link } from 'react-router-dom';

function Juego() {
  return (
    <div className="juego-container">
      <h1>¿Estás preparado?</h1>

      <Link to="/ScriptJuego">
        <button className="jugar-button">JUGAR</button>
      </Link>
    </div>
  );
}

export default Juego;

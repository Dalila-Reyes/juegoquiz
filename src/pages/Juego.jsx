import React from 'react';
import './Juego.css'; // Archivo CSS para estilos
import { Link } from 'react-router-dom';

function Juego() {
  return (
    <div className="juego-container">
      <h1 className="display-4">¿Estás preparado?</h1> {/* Clases de Bootstrap para el encabezado */}

      <Link to="/ScriptJuego">
        <button className="btn jugar-button">JUGAR</button> {/* Agregar clase de Bootstrap para botones */}
      </Link>
    </div>
  );
}

export default Juego;

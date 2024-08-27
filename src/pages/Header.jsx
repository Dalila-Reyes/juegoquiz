// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

function Header() {
  return (
    <header className="header">
      <h1>Diviértete </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/adivinanza">Adivinanzas </Link>
          </li>
          <li>
            <Link to="/juego">Juego </Link>
          </li>

        </ul>
      </nav>
    </header>
  );
}

export default Header;

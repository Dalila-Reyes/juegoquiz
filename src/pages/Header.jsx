import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap
import './Header.css';

function Header() {
  return (
    <header className="header navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <h1 className="navbar-brand">Diviértete</h1>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <nav className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle btn btn-link" 
                id="navbarDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Menú
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link to="/" className="dropdown-item">Inicio</Link>
                </li>
                <li>
                  <Link to="/adivinanza" className="dropdown-item">Adivinanzas</Link>
                </li>
                <li>
                  <Link to="/juego" className="dropdown-item">Juego en reparacion</Link>
                </li>
                <li>
                  <Link to="/juego-snake" className="dropdown-item">Juego Snake</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

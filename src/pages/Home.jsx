import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Importa el archivo de estilos personalizados

function Home() {
  return (
    <div className="container my-5">
      <div className="gif-container">
        <img src="/juegoquiz/Gif.gif" alt="Descripción del GIF" className="gif-image" /> {/* Asegúrate de que la ruta sea correcta */}
      </div>
      <h1 className="display-4 text-center my-4"></h1>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        <Link to="/quiz">
          <button className="btn btn-primary">Cultura General</button>
        </Link>
        <Link to="/quiz-Historia">
          <button className="btn btn-primary">Historia</button>
        </Link>
        <Link to="/quiz-Matematicas">
          <button className="btn btn-primary">Matemáticas</button>
        </Link>
        <Link to="/quiz-Programacion">
          <button className="btn btn-primary">Programación</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import GifComponent from './GifComponent';

function Home() {
  return (
    <div>

      
      <GifComponent />
      <h1></h1>
      <div className="button-grid">
        <Link to="/quiz">
          <button>Cultura General</button>
        </Link>
        <Link to="/quizHistoria">
          <button>Historia</button>
        </Link>
        <Link to="/quizMatematicas">
          <button>Matematicas</button>
        </Link>
        <Link to="/quizProgramacion">
          <button>Programacion</button>
        </Link>

      </div>

    </div>
  );
}

export default Home;

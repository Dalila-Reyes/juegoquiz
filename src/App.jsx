// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import QuizGeneral from './pages/QuizGeneral';
import QuizMatematicas from './pages/QuizMatematicas';
import QuizProgramacion from './pages/QuizProgramacion';
import QuizHistoria from './pages/QuizHistoria';
import Header from './pages/Header';
import GifComponent from './pages/GifComponent';
import AdivinanzaList from './pages/AdivinanzaList';
import Juego from './pages/Juego';
import ScriptJuego from './pages/ScriptJuego';
import Footer from './pages/Footer';
import SnakeGame from './pages/SnakeGame';
import JuegoSnake from './pages/juegoSnake'; // Asegúrate de que esto esté correcto
import './App.css';

function App() {
  return (
    <Router basename="/juegoquiz/"> {/* Aquí se define la base */}
      <div className="router-container">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="adivinanza" element={<AdivinanzaList />} />
          <Route path="juego" element={<Juego />} />
          <Route path="juego-snake" element={<JuegoSnake />} /> {/* Nombre de ruta correcto */}
          <Route path="script-juego" element={<ScriptJuego />} />
          <Route path="snake-game" element={<SnakeGame />} />
          <Route path="gif" element={<GifComponent />} />
          <Route path="quiz" element={<QuizGeneral />} />
          <Route path="quiz-matematicas" element={<QuizMatematicas />} />
          <Route path="quiz-programacion" element={<QuizProgramacion />} />
          <Route path="quiz-historia" element={<QuizHistoria />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

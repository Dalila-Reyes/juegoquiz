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
import ScriptJuego from './pages/ScriptJuego'; // Asegúrate de que la capitalización es correcta

import './App.css'; // Importa tu CSS global

function App() {
  return (
    <Router>
      <div className="router-container"> {/* Aplica clase aquí */}
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adivinanza" element={<AdivinanzaList />} />
          <Route path="/juego" element={<Juego />} />
          <Route path="/ScriptJuego" element={<ScriptJuego />} /> {/* Asegúrate de que la capitalización es correcta */}
          <Route path="/gif" element={<GifComponent />} />
          <Route path="/quiz" element={<QuizGeneral />} />
          <Route path="/quizMatematicas" element={<QuizMatematicas />} />
          <Route path="/quizProgramacion" element={<QuizProgramacion />} />
          <Route path="/quizHistoria" element={<QuizHistoria />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

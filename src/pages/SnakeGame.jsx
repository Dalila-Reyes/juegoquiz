import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SnakeGame.css';

const SnakeGame = () => {
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);

  const audioRef = useRef(null); // Referencia al audio de fondo
  const eatSoundRef = useRef(null); // Referencia al sonido de comer
  const loseSoundRef = useRef(null); // Referencia al sonido de perder

  function generateFood() {
    return [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
  }

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = newSnake[0];

    let newHead;
    switch (direction) {
      case 'RIGHT':
        newHead = [head[0], head[1] + 1];
        break;
      case 'LEFT':
        newHead = [head[0], head[1] - 1];
        break;
      case 'UP':
        newHead = [head[0] - 1, head[1]];
        break;
      case 'DOWN':
        newHead = [head[0] + 1, head[1]];
        break;
      default:
        newHead = head;
    }

    if (
      newHead[0] < 0 ||
      newHead[0] >= 20 ||
      newHead[1] < 0 ||
      newHead[1] >= 20 ||
      newSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
    ) {
      setGameOver(true);
      audioRef.current.pause(); // Pausar música al perder
      loseSoundRef.current.play(); // Reproducir sonido de perder
      return;
    }

    newSnake.unshift(newHead);

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(generateFood());
      setScore(score + 10); // Incrementar score
      eatSoundRef.current.play(); // Reproducir sonido de comer
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  useEffect(() => {
    if (!gameOver && !isPaused) {
      const interval = setInterval(moveSnake, speed);
      return () => clearInterval(interval);
    }
  }, [snake, direction, gameOver, isPaused, speed]);

  useEffect(() => {
    setSpeed(200 - (snake.length * 5)); // Aumenta la velocidad conforme crece la serpiente
  }, [snake]);

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      setIsPaused(!isPaused);
      if (!isPaused) {
        audioRef.current.pause(); // Pausar música al pausar el juego
      } else {
        audioRef.current.play(); // Reanudar música al reanudar el juego
      }
    }
    if (!isPaused) {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isPaused]);

  const handleControlClick = (newDirection) => {
    if (!isPaused) {
      // Permitir cambio inmediato de dirección
      setDirection(newDirection);
    }
  };

  const restartGame = () => {
    setSnake([[0, 0]]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setIsPaused(false);
    setScore(0); // Reiniciar el score
    audioRef.current.play(); // Reproducir la música al reiniciar
  };

  useEffect(() => {
    if (!gameOver) {
      audioRef.current.play(); // Reproducir la música al iniciar el juego
    }
  }, [gameOver]);

  return (
    <div className="game-container text-center">
      <audio ref={audioRef} src="audio/fondoSnake.mp3" loop /> {/* Audio de fondo */}
      <audio ref={eatSoundRef} src="audio/comerSnake.mp3" /> {/* Sonido de comer */}
      <audio ref={loseSoundRef} src="audio/perderSnake.mp3" /> {/* Sonido de perder */}

      <h2>Score: {score}</h2> {/* Mostrar el score en la parte superior */}

      {gameOver ? (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>Final Score: {score}</p> {/* Mostrar el score al final del juego */}
          <button className="btn btn-primary" onClick={restartGame}>Restart</button>
        </div>
      ) : (
        <div>
          <div className="game-board">
            {Array.from({ length: 20 }, (_, rowIndex) => (
              <div key={rowIndex} className="row">
                {Array.from({ length: 20 }, (_, colIndex) => {
                  const isSnake = snake.some(segment => segment[0] === rowIndex && segment[1] === colIndex);
                  const isFood = food[0] === rowIndex && food[1] === colIndex;
                  return (
                    <div
                      key={colIndex}
                      className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
                    ></div>
                  );
                })}
              </div>
            ))}
          </div>
          {isPaused && <h2>Paused</h2>}

          {/* Controles táctiles */}
          <div className="controls">
            <div className="control-row">
              <button className="control-button" onClick={() => handleControlClick('UP')}>↑</button>
            </div>
            <div className="control-row">
              <button className="control-button" onClick={() => handleControlClick('LEFT')}>←</button>
              <button className="control-button" onClick={() => handleControlClick('DOWN')}>↓</button>
              <button className="control-button" onClick={() => handleControlClick('RIGHT')}>→</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;

// src/Quiz.jsx
import React, { useState } from 'react';
import './QuizGeneral.css';



// Base de datos local de preguntas
const bd_historia = [
    {
        id: 0,
        pregunta: "¿Quién fue el primer presidente de Estados Unidos?",
        op0: "George Washington",
        op1: "Thomas Jefferson",
        op2: "Abraham Lincoln",
        correcta: "0"
    },
    {
        id: 1,
        pregunta: "¿En qué año comenzó la Segunda Guerra Mundial?",
        op0: "1939",
        op1: "1941",
        op2: "1945",
        correcta: "0"
    },
    {
        id: 2,
        pregunta: "¿Qué imperio construyó el Coliseo en Roma?",
        op0: "Imperio Romano",
        op1: "Imperio Bizantino",
        op2: "Imperio Otomano",
        correcta: "0"
    },
    {
        id: 3,
        pregunta: "¿Quién fue el líder de la Revolución Francesa?",
        op0: "Napoleón Bonaparte",
        op1: "Luis XVI",
        op2: "Maximilien Robespierre",
        correcta: "2"
    },
    {
        id: 4,
        pregunta: "¿Cuál fue el primer país en dar el voto a las mujeres?",
        op0: "Estados Unidos",
        op1: "Nueva Zelanda",
        op2: "Reino Unido",
        correcta: "1"
    }
];

const Pregunta = ({ pregunta, respuestas, seleccionar, resultados }) => (
    <div className={`contenedor-pregunta ${resultados.find(r => r.id === pregunta.id)?.estado}`}>
      <h2>{`${pregunta.id + 1} - ${pregunta.pregunta}`}</h2>
      <div>
        {[pregunta.op0, pregunta.op1, pregunta.op2].map((op, j) => (
          <label
            key={j}
            className={`opcion ${
              resultados.find(r => r.id === pregunta.id && r.seleccionada === j)?.estado
            }`}
          >
            <input
              type="radio"
              name={`p${pregunta.id}`}
              checked={respuestas[pregunta.id] === j}
              onChange={() => seleccionar(pregunta.id, j)}
            />
            <span>{op}</span>
            {resultados.find(r => r.id === pregunta.id && r.correcta === j) && <span>✔️</span>}
            {resultados.find(r => r.id === pregunta.id && r.seleccionada === j && r.seleccionada !== r.correcta) && <span>❌</span>}
          </label>
        ))}
      </div>
    </div>
  );
  
  function QuizHiatoria() {
    const [respuestas, setRespuestas] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [cantiCorrectas, setCantiCorrectas] = useState(0);
  
    const seleccionar = (pos, opElegida) => {
      setRespuestas(prevRespuestas => {
        const nuevasRespuestas = [...prevRespuestas];
        nuevasRespuestas[pos] = opElegida;
        return nuevasRespuestas;
      });
    };
  
    const corregir = () => {
      let correctas = 0;
      const nuevosResultados = bd_historia.map((pregunta, i) => {
        if (pregunta.correcta === respuestas[i]?.toString()) {
          correctas++;
          return { id: pregunta.id, estado: 'correcta', correcta: pregunta.correcta };
        } else {
          return { id: pregunta.id, estado: 'incorrecta', seleccionada: respuestas[i], correcta: pregunta.correcta };
        }
      });
      setResultados(nuevosResultados);
      setCantiCorrectas(correctas);
      window.scrollTo(0, 0);
    };
  
    return (
      <div>
        
        <section id="juego">
          {bd_historia.map(pregunta => (
            <Pregunta
              key={pregunta.id}
              pregunta={pregunta}
              respuestas={respuestas}
              seleccionar={seleccionar}
              resultados={resultados}
            />
          ))}
        </section>
        <button onClick={corregir}>Corregir</button>
        {cantiCorrectas !== 0 && (
          <h2 className="resultado">
            {cantiCorrectas} CORRECTAS - {bd_historia.length - cantiCorrectas} INCORRECTAS
          </h2>
        )}
      </div>
    );
  }
  
  export default QuizHiatoria;
// src/QuizMatematicas.jsx
import React, { useState } from 'react';
import './QuizGeneral.css';

// Base de datos local de preguntas
const bd_matematicas = [
    {
        id: 0,
        pregunta: "¿Cuánto es 5 + 7?",
        op0: "12",
        op1: "10",
        op2: "14",
        correcta: "0"
    },
    {
        id: 1,
        pregunta: "¿Cuál es la fórmula para el área de un círculo?",
        op0: "2πr",
        op1: "πr^2",
        op2: "πd",
        correcta: "1"
    },
    {
        id: 2,
        pregunta: "¿Qué es el teorema de Pitágoras?",
        op0: "a^2 + b^2 = c^2",
        op1: "a^2 - b^2 = c^2",
        op2: "a + b = c",
        correcta: "0"
    },
    {
        id: 3,
        pregunta: "¿Cuál es el valor de π (pi) hasta dos decimales?",
        op0: "3.13",
        op1: "3.00",
        op2: "3.14",
        correcta: "2"
    },
    {
        id: 4,
        pregunta: "¿Cuánt lados tiene un hexágono?",
        op0: "8",
        op1: "6",
        op2: "7",
        correcta: "1"
    }
];

const Pregunta = ({ pregunta, respuestas, seleccionar, resultados }) => (
    <div className={`contenedor-pregunta ${resultados.find(r => r.id === pregunta.id)?.estado}`}>
        <h2>{`${pregunta.id + 1} - ${pregunta.pregunta}`}</h2>
        <div className="opciones">
            {[pregunta.op0, pregunta.op1, pregunta.op2].map((op, j) => (
                <label key={j} className={`opcion ${resultados.find(r => r.id === pregunta.id && r.seleccionada === j)?.estado}`}>
                    <input
                        type="radio"
                        name={`p${pregunta.id}`}
                        checked={respuestas[pregunta.id] === j}
                        onChange={() => seleccionar(pregunta.id, j)}
                    />
                    <span className="texto-opcion">{op}</span>
                    {resultados.find(r => r.id === pregunta.id && r.correcta === j) && <span>✔️</span>}
                    {resultados.find(r => r.id === pregunta.id && r.seleccionada === j && r.seleccionada !== r.correcta) && <span>❌</span>}
                </label>
            ))}
        </div>
    </div>
);

function QuizMatematicas() {
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
        const nuevosResultados = bd_matematicas.map((pregunta, i) => {
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
        <div className="contenedor-quiz">
            <h1>Cuestionario de Matemáticas</h1>
            <section id="juego" className="scroll-container">
                {bd_matematicas.map(pregunta => (
                    <Pregunta
                        key={pregunta.id}
                        pregunta={pregunta}
                        respuestas={respuestas}
                        seleccionar={seleccionar}
                        resultados={resultados}
                    />
                ))}
                <button className="boton-corregir" onClick={corregir}>Corregir</button>
            </section>
            {cantiCorrectas !== 0 && (
                <h2 className="resultado">
                    {cantiCorrectas} CORRECTAS - {bd_matematicas.length - cantiCorrectas} INCORRECTAS
                </h2>
            )}
        </div>
    );
}

export default QuizMatematicas;

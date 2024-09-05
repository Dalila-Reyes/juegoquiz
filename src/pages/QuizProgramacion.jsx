// src/Quiz.jsx
import React, { useState } from 'react';
import './QuizGeneral.css';

// Base de datos local de preguntas
const bd_programacion = [
    {
        id: 0,
        pregunta: "¿Qué significa HTML?",
        op0: "HyperText Markup Language",
        op1: "HighText Machine Language",
        op2: "HyperText Multiple Language",
        correcta: "0"
    },
    {
        id: 1,
        pregunta: "¿Cuál es el operador de asignación en JavaScript?",
        op0: "=",
        op1: "==",
        op2: "===",
        correcta: "0"
    },
    {
        id: 2,
        pregunta: "¿Qué es un array en programación?",
        op0: "Un tipo de variable",
        op1: "Una lista de elementos",
        op2: "Una función",
        correcta: "1"
    },
    {
        id: 3,
        pregunta: "¿Cómo se declara una función en Python?",
        op0: "func mi_funcion()",
        op1: "function mi_funcion()",
        op2: " def mi_funcion():",
        correcta: "2"
    },
    {
        id: 4,
        pregunta: "¿Qué es un framework?",
        op0: "Un conjunto de herramientas para desarrollar aplicaciones",
        op1: "Un lenguaje de programación",
        op2: "Un tipo de base de datos",
        correcta: "0"
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

function QuizProgramacion() {
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
        const nuevosResultados = bd_programacion.map((pregunta, i) => {
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
            <h1>Cuestionario de Programación</h1>
            <section id="juego" className="scroll-container">
                {bd_programacion.map(pregunta => (
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
                    {cantiCorrectas} CORRECTAS - {bd_programacion.length - cantiCorrectas} INCORRECTAS
                </h2>
            )}
        </div>
    );
}

export default QuizProgramacion;

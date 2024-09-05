import React, { useState } from 'react';
import './QuizGeneral.css';

// Base de datos local de preguntas
const bd_juego = [
    { id: 0, pregunta: "¿Cuál es el país más pequeño del mundo?", op0: "Estado Vaticano", op1: "Mónaco", op2: "San Marino", correcta: "0" },
    { id: 1, pregunta: "¿Cuántos océanos hay en la Tierra?", op0: "Seis", op1: "Cinco", op2: "Cuatro", correcta: "1" },
    { id: 2, pregunta: "¿Qué país tiene más habitantes?", op0: "China", op1: "Estados Unidos", op2: "Rusia", correcta: "0" },
    { id: 3, pregunta: "¿Qué país es el más grande del mundo?", op0: "Rusia", op1: "Estados Unidos", op2: "India", correcta: "0" },
    { id: 4, pregunta: "¿Cuál es la montaña más alta del mundo?", op0: "Acongagua", op1: "Tabor", op2: "Everest", correcta: "2" },
    { id: 5, pregunta: "¿Cuál es el río más largo del mundo?", op0: "Nilo", op1: "Amazonas", op2: "Eufrates", correcta: "0" },
    { id: 6, pregunta: "¿Cuál es la capital de la India?", op0: "Chennai", op1: "Bombay", op2: "Nueva Delhi", correcta: "2" },
    { id: 7, pregunta: "¿Qué continente se encuentra en los 4 hemisferios?", op0: "Africa", op1: "Europa", op2: "Ninguno", correcta: "0" },
    { id: 8, pregunta: "¿Cuál es la capital de Egipto?", op0: "Alejandría", op1: "El Cairo", op2: "Menfis", correcta: "1" },
    { id: 9, pregunta: "¿Dónde se encuentra el estrecho de Magallanes?", op0: "Parte sur de América del Norte", op1: "En Europa", op2: "Parte sur de Sudamérica", correcta: "2" }
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

function Quiz() {
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
        const nuevosResultados = bd_juego.map((pregunta, i) => {
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
            <h1>Cuestionario de Generalidades</h1>
            <section id="juego" className="scroll-container">
                {bd_juego.map(pregunta => (
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
                    {cantiCorrectas} CORRECTAS - {bd_juego.length - cantiCorrectas} INCORRECTAS
                </h2>
            )}
        </div>
    );
}

export default Quiz;
import React, { useState } from 'react';
import './AdivinanzaItem.css'; // Archivo CSS para estilos específicos

function AdivinanzaItem({ adivinanza }) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="card adivinanza-item mb-3"> {/* Usamos la clase card de Bootstrap */}
            <div className="card-body text-center"> {/* Contenido centrado */}
                <p className="card-text">{adivinanza.pregunta}</p>
                <button className="btn btn-primary" onClick={() => setShowAnswer(!showAnswer)}>
                    {showAnswer ? 'Ocultar respuesta' : 'Mostrar respuesta'}
                </button>
                <h1></h1>
                {showAnswer && <p className="respuesta">{adivinanza.respuesta}</p>}
                <h1></h1>
            </div>
        </div>
    );
}

export default AdivinanzaItem;

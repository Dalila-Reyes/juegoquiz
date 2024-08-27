import React, { useState } from 'react';
import './AdivinanzaItem.css'; // Archivo CSS para estilos específicos

function AdivinanzaItem({ adivinanza }) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="adivinanza-item">
            <img src="/signo.png" alt="Signo de interrogación" className="question-mark-image" /> {/* Ruta a la imagen */}
            <p>{adivinanza.pregunta}</p>
            <button onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? 'Ocultar respuesta' : 'Mostrar respuesta'}
            </button>
            {showAnswer && <p className="respuesta">{adivinanza.respuesta}</p>}
        </div>
    );
}

export default AdivinanzaItem;

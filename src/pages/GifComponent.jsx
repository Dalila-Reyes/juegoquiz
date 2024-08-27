// src/pages/GifComponent.jsx
import React from 'react';
import './Gif.css'; // Asegúrate de importar el archivo CSS

const GifComponent = () => {
  return (
    <div className="gif-container">
      <img src="/Gif.gif" alt="Descripción del GIF" className="gif-image" />
    </div>
  );
};

export default GifComponent;

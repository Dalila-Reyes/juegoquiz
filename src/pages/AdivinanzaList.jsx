import React from 'react';
import AdivinanzaItem from './AdivinanzaItem';
import './AdivinanzaList.css';

const adivinanzas = [
  { 
    id: 1, 
    pregunta: "¿Qué se encuentra una vez en un minuto, dos veces en un momento pero ninguno en cien años?", 
    respuesta: "La letra m."
  }, 
  { 
    id: 2, 
    pregunta: "Tejo con maña, cazo con saña. En el diccionario se encuentra un término escrito incorrecto. ¿Cuál es?", 
    respuesta: "La araña."
  }, 
  { 
    id: 3, 
    pregunta: "Redondo, redondo, barril sin fondo. ¿Qué es?", 
    respuesta: "Un anillo."
  }, 
  { 
    id: 4, 
    pregunta: "¿Quién, allá en lo alto, en las ramas mora y allí esconde, avara, todo lo que roba?", 
    respuesta: "La ardilla."
  }, 
  { 
    id: 5, 
    pregunta: "¿Qué es lo que sopla sin boca y vuela sin alas?", 
    respuesta: "El viento."
  }, 
  { 
    id: 6, 
    pregunta: "No es cama ni es león y desaparece en cualquier rincón.", 
    respuesta: "El camaleón."
  }, 
  { 
    id: 7, 
    pregunta: "Chiquito como un ratón, protege la casa como león.", 
    respuesta: "El candado."
  }, 
  { 
    id: 8, 
    pregunta: "En el mar yo no me mojo, en las brasas no me abraso, en el aire no me caigo y me tienes en tus brazos.", 
    respuesta: "La letra A."
  }, 
  { 
    id: 9, 
    pregunta: "La noche tiene un ojo, un ojo de plata fina, y usted será muy flojo, muy flojo si no adivina.", 
    respuesta: "La luna."
  }, 
  { 
    id: 10, 
    pregunta: "Una vieja con un diente que llama a toda la gente.", 
    respuesta: "La campana."
  }, 
  { 
    id: 11, 
    pregunta: "Brazos con brazos, panza con panza, rascando en medio se hace la danza.", 
    respuesta: "La guitarra."
  }, 
  { 
    id: 12, 
    pregunta: "Pasa por el agua y no se moja, pasa por el fuego y no se quema.", 
    respuesta: "La sombra."
  }, 
  { 
    id: 13, 
    pregunta: "Cinco hermanos muy unidos que no se pueden mirar. Cuando riñen, aunque quieras, no los puedes separar.", 
    respuesta: "Los dedos."
  }, 
  { 
    id: 14, 
    pregunta: "¿Qué es lo que desaparece cuando se lo nombra?", 
    respuesta: "El silencio."
  }, 
  { 
    id: 15, 
    pregunta: "Y lo es, Y lo es, y no lo adivinas ni en un mes.", 
    respuesta: "El hilo."
  }, 
  { 
    id: 16, 
    pregunta: "Muy chiquito, muy chiquito, él pone fin a lo escrito.", 
    respuesta: "El punto."
  }, 
  { 
    id: 17, 
    pregunta: "Quienes lo hacen, lo hacen silvando. Quienes lo compran, lo compran llorando. Quien lo usa, no sabe que lo usa.", 
    respuesta: "El ataúd."
  }, 
  { 
    id: 18, 
    pregunta: "Capote sobre capote, capote de frío paño, aquel que llora por mí me está partiendo a pedazos.", 
    respuesta: "La cebolla."
  }, 
  { 
    id: 19, 
    pregunta: "Verde me crié, rubio me cortaron, duro me molieron, blanco me amasaron.", 
    respuesta: "El trigo."
  }, 
  { 
    id: 20, 
    pregunta: "¿Qué es lo que cuanto más grande es menos se ve?", 
    respuesta: "La oscuridad."
  }, 
  { 
    id: 21, 
    pregunta: "Existo cuando me guardan, muero cuando me sacan.", 
    respuesta: "Un secreto."
  }, 
  { 
    id: 22, 
    pregunta: "¿Cuál es el animal que siempre llega al final?", 
    respuesta: "El delfín."
  }, 
  { 
    id: 23, 
    pregunta: "Con mi cara roja, con mi ojo negro y mi vestido verde a todo el campo alegro.", 
    respuesta: "La amapola."
  }, 
  { 
    id: 24, 
    pregunta: "Tiene yemas y no es huevo, tiene copa y no es sombrero, tiene hojas y no es libro.", 
    respuesta: "El árbol."
  }, 
  { 
    id: 25, 
    pregunta: "En las manos de mujeres siempre está metido, a veces estirado, a veces recogido.", 
    respuesta: "El abanico."
  }, 
  { 
    id: 26, 
    pregunta: "Es puerto y no de mar, es rico, sin capital.", 
    respuesta: "Puerto Rico."
  }, 
  { 
    id: 27, 
    pregunta: "Sube y llena y baja vacía, si no se da prisa la sopa se enfría.", 
    respuesta: "La cuchara."
  }, 
  { 
    id: 28, 
    pregunta: "Dos hermanas diligentes que caminan al compás, con el pico por delante y los ojos por detrás.", 
    respuesta: "Las tijeras."
  }, 
  { 
    id: 29, 
    pregunta: "¿Quién es el hijo de mi madre que no es mi hermano?", 
    respuesta: "Yo."
  }, 
  { 
    id: 30, 
    pregunta: "Cien amigos tengo, todos en una tabla. Si yo no los toco ellos no me hablan.", 
    respuesta: "El piano."
  }
  
];

function AdivinanzaList() {
  return (
    <div className="adivinanza-list">
      {adivinanzas.map((adivinanza) => (
        <AdivinanzaItem key={adivinanza.id} adivinanza={adivinanza} />
      ))}
    </div>
  );
}

export default AdivinanzaList;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; // Asegúrate de crear un archivo CSS para estilos específicos

function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container text-center">
        <ul className="list-unstyled d-flex justify-content-center gap-4 mb-3">
          <li>
            {/* Puedes agregar más enlaces aquí si lo deseas */}
          </li>
          <li>
            
          </li>
        </ul>
        <p className="mb-0">© 2024 Dalila Reyes. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;

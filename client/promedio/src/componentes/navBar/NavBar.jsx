import React from 'react';
import UserIcon from '../../views/login/UserIcon';
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.userById);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">Bienvenido {user?.user?.fullName}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/home">INICIO</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/promedio">PROMEDIO</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/edicion">EDICIÓN</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/carga">CARGA</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/categoria">CATEGORÍA</a>
            </li>
          </ul>
          <UserIcon />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

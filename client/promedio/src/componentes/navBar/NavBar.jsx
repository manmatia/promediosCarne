import React from 'react';
import UserIcon from '../../views/login/UserIcon';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import "./NavBar.css"

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
              <NavLink exact to="/home" className="nav-link" activeClassName="active" aria-current="page">INICIO</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/promedio" className="nav-link" activeClassName="active">PROMEDIO</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/edicion" className="nav-link" activeClassName="active">EDICIÓN</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/carga" className="nav-link" activeClassName="active">CARGA</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categoria" className="nav-link" activeClassName="active">CATEGORÍA</NavLink>
            </li>
          </ul>
          <UserIcon />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

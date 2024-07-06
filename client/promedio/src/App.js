import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import Landing from './views/landing/Landing';
import NavBar from './componentes/navBar/NavBar';
import Category from './views/categoria/Category'; 
import Edicion from './views/edicion/Edicion.jsx';
import Carga from './views/carga/Carga.jsx';
import Promedio from "./views/promedio/Promedio"
import Footer from "./componentes/footer/Footer"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// axios.defaults.baseURL = "postgresql://postgres:mwAJVgvREDwEFTpbMOuUqYucAQTFzlqJ@viaduct.proxy.rlwy.net:28334/railway";
axios.defaults.baseURL = "http://localhost:28334";

function App() {
  const user = useSelector((state) => state.userById);
  const userId = useSelector((state) => state.userId);

  return (
    <div>
       <NavBar />
      {user?.user?.userRole === 'administrator' ||
        user?.user?.userRole === 'superadministrator' ||
        user?.user?.userRole === "user" ? (
       
      <Routes>
        
        <Route path="/home" element={<Home/>} />
        <Route path="/promedio" element={<Promedio/>} />
        <Route path="/categoria" element={<Category/>} />
        <Route path="/edicion" element={<Edicion/>} />
        <Route path="/carga" element={<Carga/>} />
        <Route path="*" element={<Home/>} />
      </Routes>) :
       <Routes>
         <Route path="*" element={<Landing/>} />
       </Routes>}
      <Footer />
    </div>
  );
}

export default App;

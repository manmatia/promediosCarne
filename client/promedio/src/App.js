import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import Landing from './views/landing/Landing';
import NavBar from './componentes/navBar/NavBar';
import Promedio from "./views/promedio/Promedio"
import Footer from "./componentes/footer/Footer"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="*" element={<Landing/>} />
        <Route path="/promedio" element={<Promedio/>} />
        {/* <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} /> */}
        {/* <Route path='/products' element={<Products />} />
        <Route path='/create' element={<Create />} /> */}
        {/* Uncomment and add missing routes as needed */}
        {/* <Route path='/products/:id' element={<Detail />} /> */}
        {/* <Route path='/procesando' element={isUserBanned ? <BannedUserPage /> : <EnProceso />} /> */}
        {/* <Route path='*' element={<Landing />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Landing.css"

function Landing() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="landing-container">  <button className="landing-button" onClick={() => navigateTo('https://assured-rhino-35.accounts.dev/sign-in')}>
 Inicie sesión 
  </button>
 </div>
  )
}

export default Landing
import React from 'react'

import { Link } from 'react-router-dom';
import "./Landing.css"

function Landing() {



  return (
    <div>
    <Link to="https://assured-rhino-35.accounts.dev/sign-in">
    <div className="landing-container">  <button className="landing-button" >
 Inicie sesión 
  </button>
 </div>
 </Link>
 </div>
  )
}

export default Landing
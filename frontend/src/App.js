import React from 'react';
import './App.css';

import logo from './assets/logo.svg';

//incluir codigo javascript dentro de html sempre com chaves = {}

function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>
        
      <div className="content">
          <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
          </p>

          <form>
            <label htmlFor="email">E-MAIL *</label>
              <input 
                type="email" 
                id="email" 
                placeholder="só vai"
            />
            <button type="submit" className="btn" >Entrar</button>
          </form>
      </div>
    </div>

  );
}

export default App;

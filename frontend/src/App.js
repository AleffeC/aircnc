import React, { useState } from 'react';
import './App.css';
import api from './services/api';

import logo from './assets/logo.svg';

//incluir codigo javascript dentro de html sempre com chaves = {}

function App() {

  const [email, setEmail] = useState(''); // setEmail atualizara o estado da variavel email

  function HandleSubmit(event){
    event.preventDefault();

    console.log(email);
  }

  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>
        
      <div className="content">
          <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
          </p>

          <form onSubmit={HandleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
              <input 
                type="email" 
                id="email" 
                placeholder="só vai"
                value={email}
                onChange={event => setEmail(event.target.value)} /*função arrow function*/
            />
            <button type="submit" className="btn" >Entrar</button>
          </form>
      </div>
    </div>

  );
}

export default App;

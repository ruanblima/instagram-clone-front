import React from 'react';
import './App.css';

import logo from './assets/Logo.png'

function App() {
  return (
    <div className="container">

      <div className="content">

        <div className="container-center">
          <img src={logo} alt="Logo" className="img" />
        </div>

        <form>

          <label htmlFor="email">E-MAIL</label>

          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
          />

          <label htmlFor="email">SENHA</label>

          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
          />

          <button className="btn" type="submit">Entrar</button>

          <div className="link">
          <a href="#">Cadastrar-se</a>
          </div>

        </form>

      </div>
    </div>
  );
}

export default App;

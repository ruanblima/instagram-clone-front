import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';


export default function Login({ history }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    //Chamando o método da api para logar
    api.post('/sessions', {
      email, senha
    }).then((response) => {
      const { _id } = response.data;

      localStorage.setItem('user', _id);

      history.push('/feed');
      //Tratando o erro, caso o e-mail ou senha estejam incorretos
    }).catch((error) => {
      alert("Seu e-email ou senha estão incorretos!");
    });

  }

  return (
    <div className="login">
      <div className="login-center">
        <img src={logo} alt="Logo" className="img" />
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL</label>
        <input
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <label htmlFor="email">SENHA</label>

        <input
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={event => setSenha(event.target.value)}
        />

        <button className="btn" type="submit">Entrar</button>

        <Link className="link" to="user">
          Cadastrar-se
                </Link>

      </form>
    </div>
  );
}
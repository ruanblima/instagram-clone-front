import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Login({ history }) {

    const [email, setEmail] = useState('');

    async function handleSubmit(event){
      event.preventDefault();
  
      const response = await api.post('/sessions', { 
        email 
    })
    .then(response => (console.log(response))
    .catch(console.log('erro')));
  
      const { _id } = response.data;
  
      localStorage.setItem('user', _id);

      history.push('/feed');    
    }

    return (
        <>
            <div className="container-center">
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
                />

                <button className="btn" type="submit">Entrar</button>

                <Link className="link" to="user">
                Cadastrar-se
                </Link>

            </form>
        </>
    );
}
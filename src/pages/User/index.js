
import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import api from '../../services/api';
import './styles.css';

export default function User({ history }) {

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        //Chamando o método de criar usuário
        api.post('/users', { nome: nome, email: email, senha: senha, telefone: telefone })
            .then((response) => {
                history.push('/');
                //Tratando o erro de -email já cadastrado
            }).catch((error) => {
                alert("E-mail já cadastrado!");
            });

    }


    return (
        <div className="user">
            <div className="user-center">
                <img src={logo} alt="Logo" className="img" />
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={event => setNome(event.target.value)}
                />

                <label htmlFor="telefone">Telefone</label>
                <input
                    id="telefone"
                    type="number"
                    placeholder="Digite seu telefone"
                    value={telefone}
                    onChange={event => setTelefone(event.target.value)}
                />


                <label htmlFor="email">E-MAIL</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <label htmlFor="senha">SENHA</label>
                <input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={event => setSenha(event.target.value)}
                />

                <button className="btn" type="submit">Cadastrar</button>


            </form>
        </div>
    );
}
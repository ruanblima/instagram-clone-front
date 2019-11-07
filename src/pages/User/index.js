
import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import api from '../../services/api';
//import axios from require('axios');


export default function User({ history }) {

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        console.log(`Nome: ${nome} - Email: ${email} - Senha ${senha} - Telefone ${telefone}`);

        data.append('email', email);
        data.append('nome', nome);
        data.append('senha', senha);
        data.append('telefone', telefone);

        //  const user = (nome, email, senha, telefone) => {
        //      axios.post('http://localhost:3333/api/users', { nome: nome, email: email, senha: senha, telefone: telefone})
        //     .then(function(response){
        //         console.log('salvo')
        //         props.history.push('/');
        //     })
        //     }
         const response = await api.post('/users', data);
         history.push('/');
         
    }

    return (
        <>
            <div className="container-center">
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
        </>
    );
}
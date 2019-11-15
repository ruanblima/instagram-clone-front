import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.png';
import api from '../../services/api';
import * as firebase from "firebase";

import './styles.css';

//Configuração do firebase
const firebaseConfig = {
    apiKey: "AIzaSyAk9wIv8IHZVSVabKQZmNo_88i3Dwwny48",
    authDomain: "cloneinsta-a08fa.firebaseapp.com",
    databaseURL: "https://cloneinsta-a08fa.firebaseio.com",
    projectId: "cloneinsta-a08fa",
    storageBucket: "cloneinsta-a08fa.appspot.com",
    messagingSenderId: "459030092542",
    appId: "1:459030092542:web:89dbc4299b73b20f11a3af",
    measurementId: "G-MRSSY0XL49"
};

firebase.initializeApp(firebaseConfig);


export default function New({ history }) {
    const [titulo, setTitulo] = useState('');
    const [imagem, setImagem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [localizacao, setLocalizacao] = useState('');

    //Método para vizualizar a imagem antes do upload
    const preview = useMemo(() => {
        return imagem ? URL.createObjectURL(imagem) : null;
    }, [imagem])

    async function handleSubmit(link, titulo, descricao, localizacao) {

        const user_id = localStorage.getItem('user');

        const data = new FormData();
        data.append('imagem', link);
        data.append('titulo', titulo);
        data.append('descricao', descricao);
        data.append('localizacao', localizacao);

        //Conexão com o node
        await api.post('/posts', data, {
            headers: { user_id }
        });

        history.push('/feed');
    }

    //Método de upload da imagem no firabase
    const fileUploadHandler = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        var storageRef = firebase.storage().ref();

        var file = document.getElementById("files").files[0];

        var thisRef = storageRef.child(file.name);

        thisRef.put(file).then(snapshot => (snapshot.ref.getDownloadURL()
            .then((s) => handleSubmit(s, titulo, descricao, localizacao)).catch((e) => console.log(e))))

    }


    return (
        <div className="new">
            <form onSubmit={(e) => e.preventDefault()}>

                <label
                    id="imagem"
                    style={{ backgroundImage: `url(${preview})` }}
                    className={imagem ? 'has-imagem' : ''}
                >
                    <input
                        type="file"
                        id="files"
                        onChange={event => setImagem(event.target.files[0])}
                    />

                    <img className="imgCamera" src={camera} alt="Selecione a imagem" />
                </label>

                <label htmlFor="titulo">Titulo</label>
                <input
                    id="titulo"
                    placeholder="Digite o titulo da sua postagem"
                    value={titulo}
                    onChange={event => setTitulo(event.target.value)}
                />

                <label htmlFor="descricao">Descrição</label>
                <input
                    id="descricao"
                    placeholder="Digite a descrição da sua postagem"
                    value={descricao}
                    onChange={event => setDescricao(event.target.value)}
                />

                <label htmlFor="localizacao">Localização</label>
                <input
                    id="localizacao"
                    placeholder="Digite a localização"
                    value={localizacao}
                    onChange={event => setLocalizacao(event.target.value)}
                />

                <button type="submit" onClick={fileUploadHandler} className="btn">Cadastrar</button>
            </form>
        </div>
    )
}
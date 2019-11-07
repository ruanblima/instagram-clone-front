import React,{ useState, useMemo} from 'react';
import camera from '../../assets/camera.png';
import api from '../../services/api';

import './styles.css';

export default function New({ history }){
    const [titulo, setTitulo] = useState('');
    const [imagem, setImagem] = useState(null);

    const preview = useMemo(() => {
        return imagem ? URL.createObjectURL(imagem) : null;
    }, [imagem])

    async function handleSubmit(event){
        // event.preventDefault();
        
        // const data = new FormData();
        // const user_id = localStorage.getItem(user);

        // data.append('imagem', imagem);
        // data.append('titulo', titulo);

        // await api.post('/posts', data, {
        //     headers: { user_id }
        // })

        // history.push('/feed');
    }
    return (
        <form onSubmit={handleSubmit}>

            <label 
            id="imagem" 
            style={{ backgroundImage: `url(${preview})` }}
            className={imagem ? 'has-imagem' : ''}
            >
                <input type="file" onChange={event => setImagem(event.target.files[0])} />
                <img className="imgCamera" src={camera} alt="Selecione a imagem"/>
            </label>

            <label htmlFor="titulo">Titulo</label>
            <input
            id="titulo"
            placeholder="Digite o titulo da sua postagem"
            value={titulo}
            onChange={event => setTitulo(event.target.value)} 
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}
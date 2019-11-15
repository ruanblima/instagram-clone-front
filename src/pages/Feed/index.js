import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';

import './styles.css';

// export const commentPost = async (comment, postId, user_id) => {

//     const data = new FormData();
//     data.append('comment', comment);
//     data.append('post', postId);

//     await api.post('/comment', data, {
//         headers: { user_id }
//     }).then((s) => console.log("cadastrado")).catch((error) => console.log("Erro"));
// }

export default function Feed({ history }) {
    // const user_id = localStorage.getItem('user');

    const [posts, setPosts] = useState([]);
    // const [comment, setComment] = useState();
    // const [like, setLike] = useState();

    useEffect(() => {
        async function loadPosts() {

            const response = await api.get('/posts');

            setPosts(response.data);
        }
        
        loadPosts();
    }, []);

    async function excluirPost(postId){

        await api.delete(`/posts/${postId}`)
        .then((s) => console.log("Removido"))
        .catch((error) => console.log(error));

        async function loadPosts() {

            const response = await api.get('/posts');

            setPosts(response.data);
        }
        loadPosts();
    }

    // async function commentPost(comment, post){

    // const user_id = localStorage.getItem('user');

    // console.log(comment);
    // console.log(post);
    // console.log(user_id);

    // await api.post('/comment', {comment}, {
    //     headers: { user_id, post}
    // }).then((s) => console.log("cadastrado")).catch((error) => console.log(error));
    // }

    // async function likePost(){
    //     const user_id = localStorage.getItem('user');

    //     await api.post('/like' , {
    //         headers: { user_id }
    //     }).then((s) => console.log("cadastrado")).catch((error) => console.log(error));
    // }


    return (
        <div className="feed">

            <header id="main-header">
                <img src={logo} alt="Logo" className="img" />
            </header>

            <Link className="Link" to="/new">
                <button type="submit" className="btn">Cadastrar postagem</button>
            </Link>

            <ul key="id" className="">
                {posts.reverse().map(post => (
                    <div className="cardPost">
                        <li key={post._id}>
                            <label id="titulo">{post.titulo}</label>
                            <img id="img" src={post.imagem} alt="img" className="img" />
                            <strong id="descricao">{post.descricao}</strong>
                            <strong id="hastags">{post.hastags}</strong>
                            <strong id="localizacao">{post.localizacao}</strong>
                            {/* <label id="label" htmlFor="">Comentário</label>
                             <input
                             id="comment"
                             placeholder="Digite o seu comentário"
                             value={comment}
                            onChange={event => setComment(event.target.value)}
                            />
                            <button className="button-feed" onClick={() => commentPost(comment, post._id)} >Comentar
                            </button> */}
                            <button className="button-feed" onClick={() => excluirPost(post._id)} >Excluir</button>
                            
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}


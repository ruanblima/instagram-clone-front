import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';

import './styles.css';

export const commentPost = async (comment, postId, user_id) => {
    await api.post('/comment', { comment, postId }, {
        headers: { user_id }
    }).then((s) => console.log("cadastrado")).catch((error) => console.log(error));
}

export default function Feed() {
    const user_id = localStorage.getItem('user');

    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState();


    useEffect(() => {
        async function loadPosts() {

            const response = await api.get('/posts');

            setPosts(response.data);
        }
        loadPosts();
    }, []);


    return (
        <div className="feed">

            <header id="main-header">
                <img src={logo} alt="Logo" className="img" />
            </header>

            <Link className="Link" to="/new">
                <button type="submit" className="btn">Cadastrar postagem</button>
            </Link>

            <ul className="">
                {posts.reverse().map(post => (
                    <div className="cardPost">
                        <li key={post._id}>
                            <strong>{post.titulo}</strong>
                            <img src={post.imagem} alt="Logo" className="img" />
                            <input
                                onChange={(text) => setComment(text)}
                            />
                            <div className="row">
                            <button className="button-feed" onClick="" >Curtir</button>
                            <button className="button-feed" onClick={() => commentPost(comment, post._id, user_id)} >Comentar</button>
                            </div>
                            
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}


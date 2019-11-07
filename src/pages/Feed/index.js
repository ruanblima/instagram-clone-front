import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Feed(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadPosts(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/posts', {
                headers: { user_id }
            });

            setPosts(response.data);
        }
        loadPosts();
    }, []);
    return (
        <>
        <div className="container-center">
                <img src={logo} alt="Logo" className="img" />
            </div>
        <ul className="post-list">
            {posts.map(post => (
                <li key={post._id}>
                    <header style={{ backgroundImage: `url(${post.imagem_url})`}} />
                </li>
            ))}
        </ul>
        <Link to="/new">
        <button type="submit" className="btn">Cadastrar postagem</button>
        </Link>
        </>
    )
}


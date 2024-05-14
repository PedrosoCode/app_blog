import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3042/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar posts:', error);
            });
    }, []);

    const editPost = (postId) => {
        // Implementar lógica de edição
    };

    const deletePost = (postId) => {
        const token = localStorage.getItem('token');

        axios.delete(`http://localhost:3042/api/posts/${postId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Post deletado com sucesso');
            setPosts(posts.filter(post => post.id !== postId));
        })
        .catch(error => {
            console.error('Erro ao deletar post:', error);
        });
    };

    return (
        <div>
            <h1>Posts</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <small>Por {post.user_id} em {new Date(post.created_at).toLocaleDateString()}</small>
                    <button onClick={() => editPost(post.id)}>Editar</button>
                    <button onClick={() => deletePost(post.id)}>Deletar</button>
                </div>
            ))}
        </div>
    );
}

export default PostList;

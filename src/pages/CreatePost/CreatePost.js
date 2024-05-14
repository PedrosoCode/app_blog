import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        axios.post('http://localhost:3042/api/posts', { title, content }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Post criado com sucesso:', response.data);
            setTitle('');
            setContent('');
        })
        .catch(error => {
            console.error('Erro ao criar post:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Criar Post</h1>
            <label>
                Título:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <br />
            <label>
                Conteúdo:
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
            </label>
            <br />
            <button type="submit">Criar</button>
        </form>
    );
}

export default CreatePost;

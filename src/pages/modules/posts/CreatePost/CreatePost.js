import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { Container, Form, Button } from 'react-bootstrap';

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

    // Configuração do ReactQuill
    const modules = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean'],
        [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
        [{ 'align': [] }],
      ],
    };

    const formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video',
      'color', 'background', 'align',
    ];

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Criar Post</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                        placeholder="Digite o título do post"
                    />
                </Form.Group>
                <Form.Group controlId="formContent" className="mb-3">
                    <Form.Label>Conteúdo</Form.Label>
                    <ReactQuill 
                        value={content} 
                        onChange={setContent} 
                        modules={modules}
                        formats={formats}
                        placeholder="Digite o conteúdo do post"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Criar</Button>
            </Form>
        </Container>
    );
}

export default CreatePost;

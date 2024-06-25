import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3042/api/posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar post:', error);
        setErrorMessage('Erro ao buscar post.');
      });
  }, [id]);

  if (!post) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Card className="my-4">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text dangerouslySetInnerHTML={{ __html: post.content }} />
          <Card.Text>
            <small className="text-muted">
              Por {post.user_id} em {new Date(post.created_at).toLocaleDateString()}
            </small>
          </Card.Text>
        </Card.Body>
      </Card>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </Container>
  );
}

export default PostDetail;

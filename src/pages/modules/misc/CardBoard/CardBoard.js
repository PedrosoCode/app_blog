import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CardBoard = () => {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState('');

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3042/api/cards', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleCreateCard = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:3042/api/cards', {
        title: newCardTitle,
        status: 'todo'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCards([...cards, response.data]);
      setNewCardTitle('');
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedCards = Array.from(cards);
    const [reorderedCard] = updatedCards.splice(result.source.index, 1);
    reorderedCard.status = result.destination.droppableId;
    updatedCards.splice(result.destination.index, 0, reorderedCard);

    setCards(updatedCards);
    // TODO: Update card status in the backend
  };

  return (
    <div>
      <h1>Task Board</h1>
      <input
        type="text"
        value={newCardTitle}
        onChange={(e) => setNewCardTitle(e.target.value)}
        placeholder="New Card Title"
      />
      <button onClick={handleCreateCard}>Add Card</button>

      <DragDropContext onDragEnd={onDragEnd}>
        {['todo', 'doing', 'done'].map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                <h2>{status.toUpperCase()}</h2>
                {cards
                  .filter((card) => card.status === status)
                  .map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card"
                        >
                          {card.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default CardBoard;

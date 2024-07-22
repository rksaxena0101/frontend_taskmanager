import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditOrAddTask = ({ isOpen, onRequestClose, item, onSave }) => {
  const [task, setTask] = useState({ title: '', description: '', deadline: '' });

  useEffect(() => {
    if (item) {
      setTask(item);
    } else {
      setTask({ title: '', description: '', deadline: '' });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(task);
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} backdrop="static" keyboard="false">
      <Modal.Header closeButton>
        <Modal.Title>{item ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTaskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTaskDeadline">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="date"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOrAddTask;
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditOrAddTask = ({ isOpen, onRequestClose, item, onSave }) => {
  const [task, setTask] = useState({ title: '', description: '', deadline: '', status: null });

  useEffect(() => {
    if (item) {
      setTask(item);
    } else {
      setTask({ title: '', description: '', deadline: '', status: null });
    }
  }, [item]);

  const handleCheckboxChange = (status) => {
    setTask((prevTask) => ({
      ...prevTask,
      status: status,
    }));
  };

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
              value={task.deadline.split('T')[0]}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTaskStatus">
            <Form.Label>Task Status</Form.Label>
            <Form.Check 
                 type="checkbox" 
                 label="Completed" 
                 checked={task.status === true} 
                 onChange={() => handleCheckboxChange(true)}
                 id='formTaskStatusTrue'
                 required
            />
            <Form.Check 
                type="checkbox" 
                label="Not Completed" 
                checked={task.status === false} 
                onChange={() => handleCheckboxChange(false)}
                id='formTaskStatusFalse'
                required
            />
            <Form.Control.Feedback type="invalid">
                Please select a task status.
            </Form.Control.Feedback>
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
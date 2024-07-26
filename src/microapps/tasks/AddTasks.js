import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Collapse from 'react-bootstrap/Collapse';

function AddTasks({ updateInput, userInput, addItem }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <style type="text/css">
                {`
                .btn-flat {
                    background-color: black; 
                    color: white;
                }
                .btn-xxl {
                    padding: 1rem 1.5rem;
                    font-size: 1.5rem;
                }    
            `}
            </style>

            <Button variant="flat" className="but" size="xxl" aria-controls="example-collapse-text" aria-expanded={open} onClick={() => setOpen(!open)}>Add Tasks</Button>

            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Form.Group className="mb-3" controlId="formTaskTitle">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task title"
                            value={userInput.title}
                            onChange={(e) => updateInput('title', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTaskDescription">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter task description"
                            value={userInput.description}
                            onChange={(e) => updateInput('description', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTaskDeadline">
                        <Form.Label>Task Deadline</Form.Label>
                        <Form.Control
                            type="date"
                            value={userInput.deadline}
                            onChange={(e) => updateInput('deadline', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTaskStatus">
                        <Form.Label>Task Status</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task status"
                            value={userInput.status}
                            onChange={(e) => updateInput('status', e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        onClick={addItem}
                    >
                        Add Task
                    </Button>
                </div>
            </Collapse>
        </>
    );
}

export default AddTasks;
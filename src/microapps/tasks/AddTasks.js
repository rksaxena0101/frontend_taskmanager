import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Collapse from 'react-bootstrap/Collapse';

function AddTasks({ updateInput, userInput, addItem }) {
    const [open, setOpen] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleCheckboxChange = (value) => {
        updateInput('status', value);
    };

    const handleAddItem = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if (userInput.title && userInput.description && userInput.deadline && userInput.status !== null) {
            addItem();
            setValidated(false);
            setOpen(false);
        }
    };

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
                .textarea-break {
                    white-space: pre-wrap; 
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                }
                .table-responsive td {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                }
            `}
            </style>

            <Button variant="flat" className="but" size="xxl" aria-controls="example-collapse-text" aria-expanded={open} onClick={() => setOpen(!open)}>Add Tasks</Button>

            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Form noValidate validated={validated} onSubmit={handleAddItem}>
                        <Form.Group className="mb-3" controlId="formTaskTitle">
                            <Form.Label>Task Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task title"
                                value={userInput.title}
                                onChange={(e) => updateInput('title', e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a task title.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTaskDescription">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter task description"
                                value={userInput.description}
                                onChange={(e) => updateInput('description', e.target.value)}
                                required
                                className="textarea-break"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a task description.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTaskDeadline">
                            <Form.Label>Task Deadline</Form.Label>
                            <Form.Control
                                type="date"
                                value={userInput.deadline}
                                onChange={(e) => updateInput('deadline', e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a task deadline.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTaskStatus">
                            <Form.Label>Task Status</Form.Label>
                            <Form.Check 
                                type="checkbox" 
                                label="Completed" 
                                checked={userInput.status === true} 
                                onChange={() => handleCheckboxChange(true)} 
                                id='formTrueTaskStatus'
                                disabled={userInput.status === false}
                                required
                            />
                            <Form.Check 
                                type="checkbox" 
                                label="Not Completed" 
                                checked={userInput.status === false} 
                                onChange={() => handleCheckboxChange(false)} 
                                id='formFalseTaskStatusTrue'
                                disabled={userInput.status === true}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please select a task status.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </Form>
                </div>
            </Collapse>
        </>
    );
}

export default AddTasks;

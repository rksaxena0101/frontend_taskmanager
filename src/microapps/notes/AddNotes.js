import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Notes = ({ isOpened, onReqClose, onNoteSave, task }) => {
    const [note, setNote] = useState({ title: '', body: '' });

    useEffect(() => {
       setNote({ title: '', body: '' }); 
    }, [isOpened]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote(prevNote => ({ ...prevNote, [name]: value }));
    };

    const handleSave = () => {
        onNoteSave(task, note);
    };

    return (
        <Modal show={isOpened} onHide={onReqClose} backdrop="static" keyboard="false">
            <Modal.Header closeButton>
                <Modal.Title>Add your review on same task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={note.title}
                            onChange={handleChange}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Add your notes here</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="body"
                            value={note.body}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onReqClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Notes;
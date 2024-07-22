import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { Table } from "react-bootstrap";

const ShowNotes = ({ isNotesOpened, onCloseNotes, notes, taskId}) => {
  
 // console.log("shown", taskId, JSON.stringify(notes));

  const deleteNotes = async (taskId, noteId) => {
    try {
      const response = await fetch(`/tasks/${taskId}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      console.log("Note deleted successfully");
      onCloseNotes();
    } catch (error) {
      console.error("Task not deleted because of", error);
      throw error;
    }
  };

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" 
    show={isNotesOpened} 
    onHide={onCloseNotes}
    backdrop="static" // This makes the background un-clickable
    keyboard={false} // This prevents closing the modal with the keyboard (ESC key
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Notes List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <div className="App">
            <header className="App-header">
              <div className="table-responsive">
                <Table className="custom-table" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map(note => (
                      <tr key={note.id}>
                        <td>{note.title}</td>
                        <td>{note.body}</td>
                        <td> <Button 
                            style={{marginRight:"10px"}} 
                            variant="light"
                            onClick={() => deleteNotes(taskId,note.id)}
                          > 
                          Delete 
                        </Button>
                      </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </Table>
              </div>
            </header>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCloseNotes}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShowNotes;
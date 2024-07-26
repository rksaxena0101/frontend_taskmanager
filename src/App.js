import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditOrAddTask from "./microapps/tasks/EditTasks";
import Notes from "./microapps/notes/AddNotes";
import ShowNotes from "./microapps/notes/ShowNotes";
import OffcanvasMenuBar from "./microapps/OffcanvasNavBar";
import AddTask from "./microapps/tasks/AddTasks";

import {
  getAllTasks,
  getTaskById,
  deleteTask,
  updateTask,
  addTask,
  addNoteToTask
} from './microapps/tasks/taskServices';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isModleOpen, setIsModleOpen] = useState(false);
  const [isShowModleOpen, setIsShowModleOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    deadline: "",
    status: ""
  });
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const getNotesFromTask = async (task) => {
    try {
      const data = await getTaskById(task.id);
      if (data.notes) {
        setNotes(data.notes);
        openNoteShowBox(task);
      }
    } catch (error) {
      console.error('Error fetching Notes:', error);
    }
  };

  const openNoteShowBox = (task) => {
    setCurrentItem(task);
    setIsShowModleOpen(true);
  }

  const closeNoteShowBox = () => {
    setCurrentItem(null);
    setIsShowModleOpen(false);
  }

  const deleteItem = async (id) => {
    try {
      await deleteTask(id);
      const deletedTasks = tasks.filter(task => task.id !== id);
      setTasks(deletedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const saveTasks = async (task) => {
    try {
      await updateTask(task);
      const upTask = tasks.map(pTask => (pTask.id === task.id) ? task : pTask);
      setTasks(upTask);
      closeEditItemBox();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const openEditItemBox = (task) => {
    setCurrentItem(task);
    setModalIsOpen(true);
  };

  const closeEditItemBox = () => {
    setModalIsOpen(false);
    setCurrentItem(null);
  };

  const updateInput = (field, value) => {
    setUserInput({ ...userInput, [field]: value });
  };

  const addItem = async () => {
    const { title, description, deadline, status } = userInput;
    if (title !== "" && description !== "" && deadline !== "" && status !== "") {
      const newItem = {
        id: Math.random(), // Change this to use a better ID mechanism
        title,
        description,
        deadline,
        status
      };
      try {
        const data = await addTask(newItem);
        setTasks([...tasks, data]);
        setUserInput({
          title: "",
          description: "",
          deadline: "",
          status: ""
        });
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const saveNotesForTask = async (task, newNote) => {
    if (newNote.title !== "" && newNote.body !== "") {
      try {
        const data = await addNoteToTask(task.id, newNote);
        setNotes([...notes, data]);
        closeNotesBox();
      } catch (error) {
        console.error('Error adding notes:', error);
      }
    }
  };

  const openNotesBox = (task) => {
    setCurrentItem(task);
    setIsModleOpen(true);
  }

  const closeNotesBox = () => {
    setCurrentItem(null);
    setIsModleOpen(false);
  }

  if (!tasks) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <OffcanvasMenuBar />
      <hr />
      <div className="App">
        <header className="App-header">
          <div className="table-responsive">
            <h2>Tasks List</h2>
            <Table className="custom-table" striped bordered hover>
              <thead>
                <tr>
                  <th>Task number</th>
                  <th>Task title</th>
                  <th>Task description</th>
                  <th>Task deadline</th>
                  <th>Task status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.deadline}</td>
                    <td>{task.status}</td>
                    <td>
                      <Button
                        style={{ marginRight: "10px" }}
                        variant="light"
                        onClick={() => deleteItem(task.id)}
                      >
                        Delete
                      </Button>

                      <Button
                        variant="light"
                        onClick={() => openEditItemBox(task)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="light"
                        onClick={() => openNotesBox(task)}
                      >
                        Add Notes
                      </Button>

                      <Button
                        variant="light"
                        onClick={() => getNotesFromTask(task)}
                      >
                        Show Notes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </header>
      </div>
      <Row>
        <Col md={{ span: 6 }}>
          <Form>
            <AddTask updateInput={updateInput} userInput={userInput} addItem={addItem}/>
          </Form>
        </Col>
      </Row>
      {currentItem && (
        <EditOrAddTask
          isOpen={modalIsOpen}
          onRequestClose={closeEditItemBox}
          item={currentItem}
          onSave={saveTasks}
        />
      )}
      {currentItem && (
        <Notes
          isOpened={isModleOpen}
          onReqClose={closeNotesBox}
          onNoteSave={saveNotesForTask}
          task={currentItem}
        />
      )}
      {currentItem && (
        <ShowNotes
          isNotesOpened={isShowModleOpen}
          onCloseNotes={closeNoteShowBox}
          notes={notes}
          taskId={currentItem.id}
        />
      )}
    </Container>
  );
};

export default App;
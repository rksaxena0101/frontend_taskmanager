// App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditOrAddTask from "./microapps/tasks/EditTasks";
import Notes from "./microapps/notes/AddNotes";
import ShowNotes from "./microapps/notes/ShowNotes";
import OffcanvasMenuBar from "./microapps/OffcanvasNavBar";
import AddTask from "./microapps/tasks/AddTasks";
import { PrivateRoute } from "./routing";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  getAllTasks,
  getTaskById,
  deleteTask,
  updateTask,
  addTask,
  addNoteToTask
} from './microapps/tasks/taskServices';
import { fetchAllUsers, getLoggedInUserDetails } from "./microapps/tasks/UserService";

const jwtToken = localStorage.getItem('jwt');

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); // New state for selected user
  const [allUsers, setAllUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isModleOpen, setIsModleOpen] = useState(false);
  const [isShowModleOpen, setIsShowModleOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    deadline: "",
    status: null
  });
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getAllTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const getLoggInUserDetails = async (username) => {
      try {
        const userDetals = await getLoggedInUserDetails(username);
        setUsers(userDetals);
      } catch (error) {
        console.log("Failed to fetch logged in user details", error);
      }
    };
    getLoggInUserDetails(username);
  },[]);

  useEffect(() => {
    if (users.role === 'ROLE_ADMIN') {
        const getAllUsersDetails = async () => {
            try {
                const AllUserList = await fetchAllUsers();
                //console.log("useEffect::alluserdetails:- ", AllUserList); // Check if the data is logged correctly
                setAllUsers(AllUserList); // Update state with the fetched user list
            } catch (error) {
                console.log("Failed to fetch all users detail.", error);
            }
        };
        getAllUsersDetails();
    }
  }, [users.role]);

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
    if (title !== "" && description !== "" && deadline !== "" && status !== null) {
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
          status: null
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

  // Handle dropdown user selection
  const handleUserSelection = (event) => {
    setSelectedUser(event.target.value); // Set the selected user ID
    console.log("Selected user ID:", event.target.value); // Check if selection works
  };

  return (
    <Container>
      <OffcanvasMenuBar />
      {/* {console.log("App.js::All users:- ",allUsers)} */}
      <p>Welcome {users.fullName && (users.role == "ROLE_ADMIN")? <b>Admin {users.fullName}</b> : <b>{users.fullName}</b>}</p>
      <hr />
          <PrivateRoute element={
            <div className="App">

            {/* Dropdown to select users */}
            {users.role === 'ROLE_ADMIN' && (
              <div>
                <label htmlFor="userSelect">Select a user</label>
                <select id="userSelect" value={selectedUser} onChange={handleUserSelection}>
                  <option value="">-- Select User --</option>
                  {allUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.fullName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <br/>
              <header className="App-header">
                <div className="table-responsive">
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
                      {jwtToken && tasks.map(task => (
                        <tr key={task.id}>
                          <td>{task.id}</td>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
                          <td>{task.deadline.split('T')[0]}</td>
                          <td>{task.status ? 'Completed' : 'Not Completed'}</td>
                          <td>
                            {
                              /*Check condition if users have role 'ROLE_CUSTOMER' not show delete or edit button else show edit and delete button*/
                              (users.role === "ROLE_ADMIN") ? 
                              (<><Button
                                  style={{ marginRight: "10px" }}
                                  variant="light"
                                  onClick={() => deleteItem(task.id)}
                                >
                                  Delete
                                </Button><Button
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
                                </Button><Button
                                  variant="light"
                                  onClick={() => getNotesFromTask(task)}
                                >
                                    Show Notes
                                  </Button>
                                  </>)
                              :
                              ( <><Button
                                  variant="light"
                                  onClick={() => openNotesBox(task)}
                                >
                                  Add Notes
                                </Button><Button
                                  variant="light"
                                  onClick={() => getNotesFromTask(task)}
                                >
                                    Show Notes
                                  </Button></>)
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </header>
              <Row>
                <Col md={{ span: 6 }}>
                  <AddTask updateInput={updateInput} userInput={userInput} addItem={addItem} />
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
            </div>
          } />
     
    </Container>
  );
};

export default App;
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, Offcanvas, Container } from "react-bootstrap";
import { useNavigate  } from 'react-router-dom';

const OffcanvasNavBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
     // Clear the local storage to log the user out
     localStorage.removeItem('jwt');
     localStorage.setItem('status', 'false');
     
     // Programmatically navigate to login page
     navigate('/login');
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">TASK MANAGER</Navbar.Brand>
          <Button variant="outline-light" onClick={handleShow}>
            Menu
          </Button>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Tasks</Nav.Link>
            <Nav.Link href="#action3">Notes</Nav.Link>
            <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffcanvasNavBar;
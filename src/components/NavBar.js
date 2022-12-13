import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "../styles/NavBar.module.css"

import logo from "../assets/logo.png"

const NavBar = () => {
    return (
        <Navbar bg="light" expand="md" fixed="top" className={styles.NavBar}>
            <Container>
                <Navbar.Brand href="#home"><Image src={logo} alt="logo" height="55"></Image></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link className={styles.NavLink}><FontAwesomeIcon icon={faSquarePlus} />New Todo</Nav.Link>
                        <Nav.Link className={styles.NavLink}><FontAwesomeIcon icon={faPenToSquare} />Assigned</Nav.Link>
                        <Nav.Link className={styles.NavLink}><FontAwesomeIcon icon={faUser} />Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default NavBar;
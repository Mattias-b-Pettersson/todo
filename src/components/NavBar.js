import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "../styles/NavBar.module.css"

import logo from "../assets/logo.png"
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="md" fixed="top" className={styles.NavBar}>
            <Container>
                <NavLink to="/"><Navbar.Brand><Image src={logo} alt="logo" height="55"></Image></Navbar.Brand></NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink exact className={styles.NavLink} to="create"><FontAwesomeIcon icon={faSquarePlus} />New Todo</NavLink>
                        <NavLink exact className={styles.NavLink} to="assigned"><FontAwesomeIcon icon={faPenToSquare} />Assigned</NavLink>
                        <NavLink exact className={styles.NavLink} to="signup"><FontAwesomeIcon icon={faUser} />Sign up</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default NavBar;
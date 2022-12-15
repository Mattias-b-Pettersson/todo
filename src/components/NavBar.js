import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faPenToSquare, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "../styles/NavBar.module.css"
import Avatar from "./Avatar"

import logo from "../assets/logo.png"
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
    const currentUser = useCurrentUser();

    const newTodo = (
        <NavLink className={(navData) => navData.isActive ? styles.Active : styles.NavLink} to="/create"><FontAwesomeIcon icon={faSquarePlus} />New Todo</NavLink>
    )

    const LoggedInIcons = 
        <>  
            <NavLink className={(navData) => navData.isActive ? styles.Active : `${styles.NavLink} `} to="/assigned"><FontAwesomeIcon icon={faPenToSquare} />Assigned</NavLink>
            <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.id}`}>
                <Avatar src={currentUser?.profile_image} text={currentUser?.username}></Avatar>
            </NavLink>
            
        </>
    
    const LoggedOutIcons = 
        <>
            <NavLink className={(navData) => navData.isActive ? styles.Active : styles.NavLink} to="/signin"><FontAwesomeIcon icon={faUser} />Sign in</NavLink>
            <NavLink className={(navData) => navData.isActive ? styles.Active : styles.NavLink} to="/signup"><FontAwesomeIcon icon={faUserPlus} />Sign up</NavLink>
        </>
    

    return (
        <Navbar bg="white" expand="md" fixed="top" className={styles.NavBar}>
            <Container>
                <NavLink to="/"><Navbar.Brand><Image src={logo} alt="logo" height="55"></Image></Navbar.Brand></NavLink>
                {currentUser && newTodo}
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">
                        {currentUser ? LoggedInIcons : LoggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default NavBar;
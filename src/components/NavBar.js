import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faPenToSquare, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "../styles/NavBar.module.css"

import logo from "../assets/logo.png"
import { NavLink } from 'react-router-dom';
import { CurrentUserContext, SetCurrentUserContext } from '../App';

const NavBar = () => {
    const setCurrentUser = useContext(SetCurrentUserContext)
    const currentUser = useContext(CurrentUserContext)
    const LoggedInIcons = 
        <>  
                <NavLink className={styles.NavLink} to="/create"><FontAwesomeIcon icon={faSquarePlus} />New Todo</NavLink>
                <NavLink className={styles.NavLink} to="/assigned"><FontAwesomeIcon icon={faPenToSquare} />Assigned</NavLink>
                <span className={`${styles.NavLinkUserName}`}>{currentUser?.username}</span>
        </>
    
    const LoggedOutIcons = 
        <>
            <NavLink className={styles.NavLink} to="/signin"><FontAwesomeIcon icon={faUser} />Sign in</NavLink>
            <NavLink className={styles.NavLink} to="/signup"><FontAwesomeIcon icon={faUserPlus} />Sign up</NavLink>
        </>
    

    return (
        <Navbar bg="light" expand="md" fixed="top" className={styles.NavBar}>
            <Container>
                <NavLink to="/"><Navbar.Brand><Image src={logo} alt="logo" height="55"></Image></Navbar.Brand></NavLink>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav>
                        {currentUser ? LoggedInIcons : LoggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default NavBar;
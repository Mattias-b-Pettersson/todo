import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faPenToSquare, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "../styles/NavBar.module.css";
import Avatar from "./Avatar";
import axios from 'axios';
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleSignOut = async (event) => {
        try {
            await axios.post("/dj-rest-auth/logout/");
            setCurrentUser(null)
            navigate("/");
        } catch (err) {
            setErrors(err.response?.data);
        }
    }

    const newTodo = (
        <NavLink className={(navData) => navData.isActive ? styles.Active : styles.NavLink} to="/create"><FontAwesomeIcon icon={faSquarePlus} />New Todo</NavLink>
    )

    const LoggedInIcons = 
        <>  
            <NavLink className={(navData) => navData.isActive ? styles.Active : styles.NavLink} to="/assigned"><FontAwesomeIcon icon={faPenToSquare} />Assigned</NavLink>
            <NavLink className={(navData) => navData.isActive ? styles.Active : styles.NavLink} onClick={handleSignOut}><FontAwesomeIcon icon={faPenToSquare} />Sign out</NavLink>
            <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.id}`}>
                <Avatar src={currentUser?.profile_image} height="45" text={currentUser?.username}/>
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
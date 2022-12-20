import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faPenToSquare, faUser, faUserPlus, faBars,  faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Button, Dropdown, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "../styles/NavBar.module.css";
import Avatar from "./Avatar";
import axios from 'axios';
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import useClickOutsideToggle from '../hooks/useClickOutsideHook';
import { useHandleWindowSize } from '../hooks/useHandleWindowSize';


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const navigate = useNavigate();
    const { expanded, setExpanded, ref } = useClickOutsideToggle();
    const { windowSize } = useHandleWindowSize();

    const [, setErrors] = useState({});

    const handleSignOut = async (event) => {
        try {
            await axios.post("/dj-rest-auth/logout/");
            setCurrentUser(null)
            navigate("/");
        } catch (err) {
            setErrors(err.response?.data);
        }
    }

    const CustomToggleDropDown = React.forwardRef(({ children, onClick }, ref) => (
        <Button
            variant="link"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={`${styles.NavLink}  d-flex align-items-center pt-2`}
        >
            <Avatar src={currentUser?.profile_image} height="45" text={currentUser?.username} />
            <FontAwesomeIcon icon={faBars} className="ms-2" />
            {children}
        </Button>
    ));  

    const DropdownMenu = () => {
        if (windowSize.width >= 768) {
            return (
                <>
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggleDropDown} />
                        <Dropdown.Menu>

                            <Dropdown.Item>
                                <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}>
                                    <FontAwesomeIcon icon={faUser} />
                                    Profile
                                </NavLink>
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item>
                                <NavLink className={styles.NavLink} onClick={handleSignOut}><FontAwesomeIcon icon={faRightFromBracket} />
                                    Sign out
                                </NavLink>
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )
        } else {
            return (
                <>
                    
                    <NavLink className={`${styles.NavLink} mt-3`} to={`/profiles/${currentUser?.id}`}>
                        <Avatar src={currentUser?.profile_image} height="45" text={currentUser?.username} />
                    </NavLink>
                    <NavLink className={`${styles.NavLink} mt-3`} onClick={handleSignOut}><FontAwesomeIcon icon={faRightFromBracket} />
                        Sign out
                    </NavLink>
                </>
            )
        }
    }



    const newTodo = (
        <NavLink className={(navData) => navData.isActive ? `${styles.Active} pt-0` : `${styles.NavLink} pt-0`} to="/create"><FontAwesomeIcon icon={faSquarePlus} />New Todo</NavLink>
    )

    const LoggedInIcons =
        <>
            <NavLink className={(navData) => navData.isActive ? `${styles.Active} pt-0` : `${styles.NavLink} pt-0`} to="/"><FontAwesomeIcon icon={faPenToSquare} />Todos</NavLink>
            <DropdownMenu />
        </>
    
    const LoggedOutIcons = 
        <>
            <NavLink className={(navData) => navData.isActive ? styles.Active : styles.NavLink} to="/signin"><FontAwesomeIcon icon={faUser} />Sign in</NavLink>
            <NavLink className={(navData) => navData.isActive ? styles.Active : styles.NavLink} to="/signup"><FontAwesomeIcon icon={faUserPlus} />Sign up</NavLink>
        </>
    

    return (
        <Navbar
            bg="white"
            expand="md"
            fixed="top"
            expanded={expanded}
            className={styles.NavBar}
        >
            <Container>
                <NavLink to="/"><Navbar.Brand><Image src={logo} alt="logo" height="55"></Image></Navbar.Brand></NavLink>
                {currentUser && newTodo}
                <Navbar.Toggle aria-controls="navbar-nav" ref={ref}
                    onClick={() => { setExpanded(!expanded) }} />
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
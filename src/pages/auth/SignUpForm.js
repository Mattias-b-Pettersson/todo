import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SignInImage from "../../assets/SignInImage.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faKey } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/SignUpInForm.module.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRedirect } from '../../hooks/useRedirect';

const SignUpForm = () => {
    useRedirect("loggedIn")
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });

    const [errors, setErrors] = useState({});

    const { username, password1, password2 } = signUpData

    const navigate = useNavigate();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value
        });
    
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData);
            navigate("/signin");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container fluid="true">

            <Card className='text-black m-5' style={{ borderRadius: '25px' }}>
                <Card.Body>
                    <Row className="justify-content-center">
                        <Col md='12' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <Form onSubmit={handleSubmit}>
                                <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h1>

                                <Form.Group className="mb-4" controlId="username">
                                    <Form.Label className="d-none">Username</Form.Label>
                                    <Row className="">
                                        <Col xs={1}><FontAwesomeIcon icon={faUser} className="me-2 mt-2" /></Col>
                                        <Col xs={11}><Form.Control
                                            type="username"
                                            placeholder="Enter username"
                                            name="username"
                                            value={username}
                                            onChange={handleChange}
                                        /></Col>
                                    </Row>
                                </Form.Group>
                                <Row>
                                    <Col xs={1}></Col>
                                    <Col xs={11}>
                                        {errors.username?.map((message, idx) => 
                                            <Alert variant="warning" key={idx}>{message}</Alert>
                                        )}
                                    </Col>
                                </Row>
                                    
                                <Form.Group className="mb-4" controlId="password1">
                                    <Form.Label className='d-none'>Password</Form.Label>
                                    <Row className="">
                                        <Col xs={1}><FontAwesomeIcon icon={faLock} className="me-2 mt-2" /></Col>
                                        <Col xs={11}><Form.Control
                                            className="md-auto"
                                            type="password"
                                            placeholder="Enter password"
                                            name="password1"
                                            value={password1}
                                            onChange={handleChange}
                                        /></Col>
                                    </Row>
                                </Form.Group>
                                <Row>
                                    <Col xs={1}></Col>
                                    <Col xs={11}>
                                        {errors.password1?.map((message, idx) =>
                                            <Alert variant="warning" key={idx}>{message}</Alert>
                                        )}
                                    </Col>
                                </Row>

                            
                                <Form.Group className="mb-3" controlId="password2">

                                    <Form.Label className='d-none'>Confirm password</Form.Label>

                                    <Row className="">
                                        <Col xs={1}><FontAwesomeIcon icon={faKey} className="me-2 mt-2" /></Col>
                                        <Col xs={11}><Form.Control
                                            type="password"
                                            placeholder="Confirm password"
                                            name="password2"
                                            value={password2}
                                            onChange={handleChange}
                                        /></Col>
                                    </Row>
                                </Form.Group>
                                <Row>
                                    <Col xs={1}></Col>
                                    <Col xs={11}>
                                        {errors.password2?.map((message, idx) =>
                                            <Alert variant="warning" key={idx}>{message}</Alert>
                                        )}
                                    </Col>
                                </Row>
                                
                                <p>Already have an account? Sign in <Link to="/signin">here</Link></p>

                                <Button
                                    className={`${styles.submitBtn}`}
                                    type="submit" 
                                >
                                    Sign up
                                </Button>
                                {errors.non_field_errors?.map((message, idx) => (
                                    <Alert key={idx} variant="warning" className="mt-3">
                                        {message}
                                    </Alert>
                                ))}
                            </Form>
                        </Col>

                        <Col md='8' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <Card.Img src={SignInImage} fluid="true" />
                        </Col>

                    </Row>
                </Card.Body>
            </Card>

        </Container>
    );
}

export default SignUpForm;
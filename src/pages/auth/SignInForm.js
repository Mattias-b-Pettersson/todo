import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SignInImage from "../../assets/SignInImage.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/SignUpInForm.module.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInForm = () => {
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const { username, password } = signInData

    const navigate = useNavigate();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value
        });

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/login/", signInData);
            navigate("/");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container fluid="true">
            <Card className='m-5 d-flex align-items-center' style={{ borderRadius: '25px' }}>
                <Card.Body>
                    <Row className="justify-content-center">
                        <Col md='12' lg='6' className="order-2 order-lg-1 d-flex flex-column align-items-center align-self-center">
                            <Form onSubmit={handleSubmit}>
                                <h1 className="text-center fw-bold mb-xs-1 mb-sm-5 mx-4 mt-4">Sign in</h1>

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

                                <Form.Group className="mb-4" controlId="password">
                                    <Form.Label className='d-none'>Password</Form.Label>
                                    <Row className="">
                                        <Col xs={1}><FontAwesomeIcon icon={faLock} className="me-2 mt-2" /></Col>
                                        <Col xs={11}><Form.Control
                                            className="md-auto"
                                            type="password"
                                            placeholder="Enter password"
                                            name="password"
                                            value={password}
                                            onChange={handleChange}
                                        /></Col>
                                    </Row>
                                </Form.Group>
                                <Row>
                                    <Col xs={1}></Col>
                                    <Col xs={11}>
                                        {errors.password?.map((message, idx) =>
                                            <Alert variant="warning" key={idx}>{message}</Alert>
                                        )}
                                    </Col>
                                </Row>


                
                                <Row>
                                    <Col xs={1}></Col>
                                    <Col xs={11}>
                                        {errors.password2?.map((message, idx) =>
                                            <Alert variant="warning" key={idx}>{message}</Alert>
                                        )}
                                    </Col>
                                </Row>

                                <p>Don't have an account? Register an account <Link to="/signup">here</Link>!</p>

                                <Button
                                    className={`${styles.submitBtn}`}
                                    type="submit"
                                >
                                    Sign in
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

export default SignInForm;
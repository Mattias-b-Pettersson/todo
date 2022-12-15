import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import SignInImage from "../../assets/SignInImage.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faKey } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/SignUpInForm.module.css"
import { Link } from 'react-router-dom';

const SignUpForm = () => {
    return (
        <Container fluid>

            <Card className='text-black m-5' style={{ borderRadius: '25px' }}>
                <Card.Body>
                    <Row className="justify-content-center">
                        <Col md='12' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <Form >
                                <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h1>

                                <Form.Group className="mb-4" controlId="username">
                                    <Form.Label className="d-none">Username</Form.Label>
                                    <Row className="">
                                        <Col xs={1}><FontAwesomeIcon icon={faUser} className="me-2" /></Col>
                                        <Col xs={11}><Form.Control type="username" placeholder="Enter username" name="username" /></Col>
                                    </Row>
                                </Form.Group>
                                
                                <Form.Group className="mb-4" controlId="password1">
                                    <Form.Label className='d-none'>Password</Form.Label>
                                    <Row className="">
                                        <Col xs={1}><FontAwesomeIcon icon={faLock} className="" /></Col>
                                        <Col xs={11}><Form.Control className="md-auto" type="password1" placeholder="Enter password" name="password1" /></Col>
                                    </Row>
                                </Form.Group>

                            
                                <Form.Group className="mb-3" controlId="password2">

                                    <Form.Label className='d-none'>Confirm password</Form.Label>

                                    <Row className="">
                                        <Col xs={1}><FontAwesomeIcon icon={faKey} className="me-1" /></Col>
                                        <Col xs={11}><Form.Control type="password2" placeholder="Confirm password" name="password2" /></Col>
                                    </Row>
                                </Form.Group>
                                
                                <p>Already have an account? Sign in <Link to="/signin">here</Link></p>

                                <Button className={`mb-4 ${styles.btn}`} size='lg'>Register</Button>
                            </Form>
                        </Col>

                        <Col md='8' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <Card.Img src={SignInImage} fluid />
                        </Col>

                    </Row>
                </Card.Body>
            </Card>

        </Container>
    );
}

export default SignUpForm;
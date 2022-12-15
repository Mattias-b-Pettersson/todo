import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import SignInImage from "../../assets/SignInImage.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faKey } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/SignUpInForm.module.css"

const SignUpForm = () => {
    return (
        <Container fluid>

            <Card className='text-black m-5' style={{ borderRadius: '25px' }}>
                <Card.Body>
                    <Row className="justify-content-center">
                        <Col md='12' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <Form >
                            <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h1>
                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label className="d-none">Username</Form.Label>
                                    <td><FontAwesomeIcon icon={faUser} className="me-2" /></td>
                                    <td><Form.Control type="username" placeholder="Enter username" name="username" /></td>
                                </Form.Group>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <Form.Group className="mb-3" controlId="password1">
                                        <Form.Label className='d-none'>Password</Form.Label>
                                        <td><FontAwesomeIcon icon={faLock} className="me-2" /></td>
                                    <td><Form.Control type="password1" placeholder="Enter password" name="password1" /></td>
                                </Form.Group>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <Form.Group className="mb-3" controlId="password2">
                                    
                                        <Form.Label className='d-none'>Confirm password</Form.Label>
                                        <td><FontAwesomeIcon icon={faKey} className="me-1" /></td>
                                        <td><Form.Control type="password2" placeholder="Confirm password" name="password2" /></td>
                                </Form.Group>
                            </div>


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
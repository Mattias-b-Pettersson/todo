import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import { Todo } from './Todo';


export const TodoPage = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState({ results: [] })
    
    useEffect(() => {

        // Get the todo that with id from the URL on mount
        const handleMount = async () => {
            try {
                const [{ data: todo }] = await Promise.all([
                    axiosReq.get(`/todo/${id}/`),
                ])
                setTodo({ results: [todo] })
            } catch (error) {
                console.log(error)
            }
        }
        handleMount();

    },[id, todo])


    return (
        <Row fluid="true" className="justify-content-center">
            <Col xl={8} lg={10} className='mt-3'>
                <Row>
                    <Card>
                        <h1 className="mt-4">Todo</h1>
                        <Card.Body>
                            <Todo {...todo.results[0]} setTodo={setTodo} />
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
        </Row>
    )
}

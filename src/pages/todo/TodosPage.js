import React, { useEffect, useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Todo } from './Todo';
import loading from "../../assets/loading.gif"
import { Link, useLocation } from 'react-router-dom';



export const TodosPage = () => {
    const [todo, setTodo] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const currentUser = useCurrentUser();
    const { pathname } = useLocation();

    useEffect(() => {
        // Get the todo that with id from the URL on mount
        const fetchOwnedPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/todos/?owner=${currentUser?.profile_id}`)
                setTodo(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOwnedPosts();
        setHasLoaded(true)
    }, [currentUser?.profile_id, pathname])


    return (
        <Row fluid="true" className="justify-content-center">
            <Col xl={8} lg={10} className='mt-3'>
                <Row>
                    {currentUser ? (
                        hasLoaded ? (
                            <Card>
                            <h1 className="mt-4">Todo</h1>
                            <Card.Body>
                                {todo.results.map(result => <div key={result.id} className='mb-4'>
                                    <Link to={`/todo/${result.id}`}>
                                        < Todo {...result} setTodo={setTodo} />
                                    </Link>
                                </div>)}
                            </Card.Body>
                            </Card>
                        ) : (
                            <img src={loading} height={102} alt="loading..." />
                        )
                    ) : (
                        <p>Please sign in or create an account</p>
                    )}
                    
                </Row>
            </Col>
        </Row>
    )
}

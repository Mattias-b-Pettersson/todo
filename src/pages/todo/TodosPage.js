import React, { useEffect, useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Todo } from './Todo';
import loading from "../../assets/loading.gif"
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';


export default function TodosPage () {
    const [todos, setTodos] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const currentUser = useCurrentUser();
    const { pathname } = useLocation();
    const [searchFields, setSearchFields] = useState({
        search: "",
        ordering: "",
        status: "",
        priority: "",
        assignedOrCreated: `&assigned=${currentUser?.profile_id}`
    });
    const { search, ordering, status, priority, assignedOrCreated } = searchFields;


    useEffect(() => {
        // Fetches all todos that are created by the current user and sets the state to todos with 
        // data that is returned from the API and sets hasLoaded to true so that the loading gif is not shown anymore

        
        const fetchTodos = async () => {
                try {
                        const { data } = await axiosReq.get(`/todos/?owner=&search=${search}&ordering=${ordering}&status=${status}&priority=${priority}${assignedOrCreated}`)
                        setTodos(data)
                        setHasLoaded(true)
                } catch (error) {
                    // console.log(error)
                }
        }

        
        setHasLoaded(false);

        // will still send 1 request to the API if the profile_id is undefined but can't see a way around this.
        // If this if statement is not here then the fetchTodos function will be called 3 times on mount instead of 1.
        if (currentUser?.profile_id) {
            fetchTodos();
        }

    }, [currentUser, pathname, search, ordering, status, priority, assignedOrCreated, searchFields])

    useEffect(() => {
        // Sets the assignedOrCreated field to the current user's profile id
        setSearchFields({
            ...searchFields,
            assignedOrCreated: `&assigned=${currentUser?.profile_id}`
        })
    }, [currentUser?.profile_id])


    const handleChange = (e) => {
        // handles the change of the search and ordering fields
        setSearchFields({
            ...searchFields,
            [e.target.name]: e.target.value
        })

    }


    return (
        <Row fluid="true" className="justify-content-center">
            <Col xl={8} lg={10} className='mt-3'>
                <Row>
                    {currentUser ? (
                        <Card>
                            <h1 className="mt-4">Todos</h1>

                            <Form onSubmit={(event) => event.preventDefault()}>
                                <Row>
                                <Col>
                                <p className='mb-0'>Search</p>
                                <Form.Control name="search" as="input" onChange={handleChange} value={search} placeholder="Search..." className='mb-2' />
                                </Col>
                                <Col>
                                <p className='mb-0'>Order by:</p>
                                <Form.Control name="ordering" as="select" onChange={handleChange} value={ordering}>
                                    <option value="">----</option>
                                    <option value="status">Ascending status</option>
                                    <option value="-status">Descending status</option>
                                    <option value="priority">Ascending priority</option>
                                    <option value="-priority">Descending priority</option>
                                </Form.Control>
                                </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className='mb-0'>Sort by status</p>
                                        <Form.Control name="status" as="select" onChange={handleChange} value={status} className='mt-2'>
                                            <option value="">----</option>
                                            <option value="todo">Todo</option>
                                            <option value="in_progress">In progress</option>
                                            <option value="on_hold">On hold</option>
                                            <option value="done">Done</option>
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <p className='mb-0'>Sort by Priority</p>
                                        <Form.Control name="priority" as="select" onChange={handleChange} value={priority} className='mt-2'>
                                            <option value="" name="" >----</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Form.Control name="assignedOrCreated" as="select" onChange={handleChange} value={assignedOrCreated} className='mt-2'>
                                            <option value={`&assigned=${currentUser?.profile_id}`}>Assigned to you</option>
                                            <option value={`&owner=${currentUser?.profile_id}`}>Created by you</option>

                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form>
                            {hasLoaded ? (
                                todos.results.length ? (
                                    <Card.Body>
                                    <Row>
                                        <InfiniteScroll
                                            children={
                                                todos.results.map(result => < Todo {...result} setTodo={setTodos} key={result.id} todos={todos} setTodos={setTodos} />)
                                            }
                                            dataLength={todos.results.length}
                                            loader={<img src={loading} height={102} width={102} alt="loading..." className='mx-auto my-5' />}
                                            hasMore={!!todos.next}
                                            next={() => { fetchMoreData(todos, setTodos) }}
                                        />
                                    </Row>
                                </Card.Body>
                                ) : (<h2 className='text-center my-4'>No todos found</h2>)
                                
                            ) : (
                                <img src={loading} height={102} width={102} alt="loading..." className='mx-auto my-5' />
                            )}
                        </Card>
                    ) : (
                        <p>Please sign in or create an account</p>
                    )}

                </Row>
            </Col>
        </Row>
    )
}


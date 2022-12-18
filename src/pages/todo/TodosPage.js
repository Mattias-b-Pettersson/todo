import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Todo } from './Todo';
import loading from "../../assets/loading.gif"
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';


export const TodosPage = () => {
    const [todo, setTodo] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const currentUser = useCurrentUser();
    const { pathname } = useLocation();
    const [searchFields, setSearchFields] = useState({
        search: "",
        ordering: "",
    });
    const { search, ordering } = searchFields;

    useEffect(() => {
        // Fetches all todos that are assigned to the current user and sets the state to todo with data that is returned from the API and sets hasLoaded to true so that the loading gif is not shown anymore
        const fetchTodos = async () => {
            try {
                const { data } = await axiosReq.get(`/todos/?owner=&assigned=${currentUser?.profile_id}&search=${search}`)
                setTodo(data)
                setHasLoaded(true)
            } catch (error) {
                console.log(error)
            }
        }
        setHasLoaded(false);
        fetchTodos();
        
    }, [currentUser, pathname, search])

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
                                <h1 className="mt-4">Todo</h1>
                                
                                <Form onSubmit={(event)=>event.preventDefault}>
                                    <p className='mb-1'>Order by:</p>
                                    <Form.Control name="search" as="input" onChange={handleChange} value={search} placeholder="Search..." />
                                    <Form.Control name="ordering" as="select" onChange={handleChange} value={ordering}>
                                        <option value="status">Ascending status</option>
                                        <option value="-status">Descending status</option>
                                        <option value="priority">Ascending priority</option>
                                        <option value="-priority">Descending priority</option>
                                    </Form.Control>
                                </Form>
                            {hasLoaded ? (
                            <Card.Body>
                                <InfiniteScroll 
                                    children={
                                        todo.results.map(result => <div key={result.id} className='mb-4'>         
                                        < Todo {...result} setTodo={setTodo} />
                                        </div>)
                                    }
                                    dataLength={todo.results.length}
                                    loader={loading}
                                    hasMore={!!todo.next}
                                    next={() => {fetchMoreData(todo, setTodo)}}
                                />
                                {todo.results.map(result => <div key={result.id} className='mb-4'>         
                                        < Todo {...result} setTodo={setTodo} />
                                </div>)}
                            </Card.Body>
                        ) : (
                            <img src={loading} height={102} width={102} alt="loading..." className='mx-auto my-5'/>
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

import React, { useEffect, useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import { Todo } from './Todo';
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Comment } from '../comments/Comment';
import loading from "../../assets/loading.gif"
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';


export const TodoPage = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false);

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });
    
    useEffect(() => {

        // Get the todo that with id from the URL on mount
        const handleMount = async () => {
            try {
                const [{ data: todo }, { data: comments}] = await Promise.all([
                    axiosReq.get(`/todo/${id}/`),
                    axiosReq.get(`/comments/?todo=${id}`),
                ])
                setTodo({ results: [todo] });
                setComments(comments);
                setHasLoaded(true);
            } catch (error) {
                
            }
        }
        setHasLoaded(false);
        handleMount();

    },[id])


    return (
        <Row fluid="true" className="justify-content-center">
            <Col xl={8} lg={10} className='mt-3'>
                <Card>
                    {hasLoaded ? (
                    <Card.Body>
                        <Todo {...todo.results[0]} setTodo={setTodo} />
                        {currentUser ? (
                            <CommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            todo={id}
                            setTodo={setTodo}
                            setComments={setComments}
                           
                            />
                        ) : comments.results.length ? (
                            "Comments"
                        ) : null}
                        {comments.results.length ? (

                            <InfiniteScroll 
                            children={
                                comments.results.map(comment => 
                                    <Comment
                                    key={comment.id}
                                    {...comment}
                                    setComments={setComments}
                                    comments={comments}
                                    />
                                )}
                            loader={<img src={loading} height={102} width={102} alt="loading..." className='mx-auto my-5'/>}
                            hasMore={!!comments.next}
                            dataLength={comments.results.length}
                            next={() => {fetchMoreData(comments, setComments)}}
                            />
                        ) : <span className='m3-4'>No comments yet...</span>}
                    </Card.Body>
                    ) : (
                        <img className="mx-auto my-4" src={loading} width="102" height="102" alt="loading" />
                    )}
                </Card>
            </Col>
        </Row>
    )
}

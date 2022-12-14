import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from 'react-router-dom';
import { faFile, faClipboard, faUserGroup, faHourglassHalf, faClock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "../../styles/Todo.module.css"
import { EllipsisButton } from '../../components/EllipsisButton';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';

export const Todo = (props) => {
    
    const navigate = useNavigate();
    const {
        id,
        assigned_username_id_img,
        content,
        file,
        is_owner_or_assigned,
        owner,
        priority,
        profile_id,
        status_prettified,
        title,
        updated_at,
        setTodo,
        due_date,
        due_date_has_passed,
    } = props;

    const handleDelete = () => {
        //this is a function that deletes the todo on click, it is passed down to the EllipsisButton component
        const deleteItem = async () => {
        try {
            await axiosRes.delete(`/todo/${id}/`)
            setTodo((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
            }))
        } catch (error) {
            
        }}
        deleteItem();
      }

    const handleEdit = () => {
        //this is a function that navigates to edit page, it is passed down to the EllipsisButton component
        navigate(`/todo/${id}/edit`)
    }


    return (
        <Card  className={`${styles.cardClass} mt-4`}>
            
            <Card.Header className="d-flex pb-0" >
                <Link to={`/todo/${id}`} className={`mx-auto text-decoration-none`}>
                <Card.Title><p className='fs-3'>{title}</p></Card.Title>
                </Link>
                {is_owner_or_assigned && <EllipsisButton isType="todo" id={id} handleDelete={handleDelete} handleEdit={handleEdit} />}
            </Card.Header>
            
            <Card.Body>

                <Row className="mx-auto">
                    <Col className="mx-auto">
                        <p className='mb-0'><FontAwesomeIcon icon={faExclamationTriangle} /> Priority: {priority}</p>
                        <p className='my-1'><FontAwesomeIcon icon={faClock} /> status: {status_prettified}</p>
                        {due_date_has_passed ? (<p className='mt-0 d-inline rounded p-1 bg-danger'><FontAwesomeIcon icon={faHourglassHalf}  /> Due Date: {due_date}</p>) : (<p className='mt-0 p-2'><FontAwesomeIcon icon={faHourglassHalf} /> Due Date: {due_date}</p>)}
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} className="d-inline-block mt-3 mx-auto ">
                        {content && <>
                        <p className="mb-1"><FontAwesomeIcon icon={faClipboard} /> Description:</p>
                        <p>{content}</p>
                        </>}
                    </Col>
                </Row>
                {assigned_username_id_img &&
                    <Row>
                        <Col xs={10} className="d-inline-block mt-3 mx-auto ">
                            <p className="mb-1"><FontAwesomeIcon icon={faUserGroup} /> Assigned: </p>{assigned_username_id_img.map(assigned => <div className="d-inline mx-1" key={assigned[2]}><Link className={styles.NavLink} to={`/profiles/${assigned[2]}`}><Avatar src={assigned[1]} text={assigned[0]} height="30"/></Link></div>)}
                        </Col>
                    </Row>
                }
                
                {file &&
                    <Row>
                        <Col className="mt-4">
                            <p> Attached file: <Link to={file}><FontAwesomeIcon icon={faFile} /></Link></p>
                        </Col>
                    </Row>
                }

            </Card.Body>
            {owner && updated_at &&
                <Card.Footer className="pb-0">
                    <small className="d-flex">
                        <p className='mb-2'>Created by: <Link to={`/profiles/${profile_id}`}>{owner}</Link></p>
                        <p className='ms-auto text-muted mb-2'>Updated at: {updated_at}</p>
                    </small>
                </Card.Footer>
            }
        </Card>
    )
}

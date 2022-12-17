import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from "../../components/Avatar"
import { faFile, faClipboard, faUserGroup, faHourglassHalf, faClock, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "../../styles/Todo.module.css"
import { EllipsisButton } from '../../components/EllipsisButton';

export const Todo = (props) => {
    const {
        id,
        assigned,
        content,
        created_at,
        file,
        is_owner,
        owner,
        priority,
        profile_id,
        status,
        title,
        updated_at,
    } = props;

    return (
        <Card className={styles.cardClass}>
            
            <Card.Header className="d-flex pb-0" >
                <Link to={`/todo/${id}`} className={`mx-auto text-decoration-none`}>
                <Card.Title><p className='fs-3'>{title}</p></Card.Title>
                </Link>
                {is_owner && <EllipsisButton type="todo" id/>}
            </Card.Header>
            
            <Card.Body>

                <Row>
                    <Col className="mx-auto">
                        {priority && <p className='mb-0'><FontAwesomeIcon icon={faHourglassHalf} /> Priority: {priority}</p>}
                        {status && <p><FontAwesomeIcon icon={faClock} /> status: {status}</p>}
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} className="d-inline-block mt-3 mx-auto ">
                        {content && <>
                        <p className="mb-1"><FontAwesomeIcon icon={faClipboard} /> Description:</p>
                        <p className="text-truncate">{content}</p>
                        </>}
                    </Col>
                </Row>
                {assigned &&
                    <Row>
                        <Col xs={10} className="d-inline-block mt-3 mx-auto ">
                            <p className="mb-1"><FontAwesomeIcon icon={faUserGroup} /> Assigned: {assigned}</p>
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

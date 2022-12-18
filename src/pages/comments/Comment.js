import React from 'react'
import { Card, Col } from 'react-bootstrap'
import Avatar from '../../components/Avatar'

export const Comment = ({ content, created_at, profile_image, owner }) => {

  return (
    <Card fluid="true" className='my-3'>
        <Card.Body className='border-bottom'>
            <Col fluid className="d-flex">
                <div className='align-self-center'>
                <Avatar src={profile_image} text={owner} />      
                </div>     
                <div className='ms-auto align-self-center text-muted'>
                    Created: {created_at}
                </div>
            </Col>
            <p className='d-flex pt-3 ps-2 ms-auto border-top'>{content}</p>
        </Card.Body>
    </Card>
  )
}

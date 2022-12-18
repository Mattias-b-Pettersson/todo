import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults'
import Avatar from '../../components/Avatar'
import { EllipsisButton } from '../../components/EllipsisButton'

export const Comment = ({ id, content, created_at, profile_image, owner, is_owner, setComments, comments }) => {

    const handleDelete = () => {
        //this is a function that deletes the comment on click, it is passed down to the EllipsisButton component
        const deleteItem = async () => {
        try {
            await axiosRes.delete(`/comment/${id}/`)
        } catch (error) {
            console.log(error)
        }}
        deleteItem();
        setComments((prevComments) => ({
            ...prevComments,
            results: prevComments.results.filter((comment) => comment.id !== id),
        }))}


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
                {is_owner &&
                    <EllipsisButton isType="comment" id={id} handleDelete={handleDelete} />
                }
            </Col>
            <p className='d-flex pt-3 ps-2 ms-auto border-top'>{content}</p>
        </Card.Body>
    </Card>
  )
}

import React, { useState } from 'react'
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom'
import { axiosRes } from '../../api/axiosDefaults'
import Avatar from '../../components/Avatar'
import { EllipsisButton } from '../../components/EllipsisButton'
import CommentEditForm from "./CommentEditForm";

export const Comment = ({ id, content, updated_at, created_at, profile_image, owner, is_owner, setComments, comments, profile_id }) => {
    const [showEditForm, setShowEditForm] = useState(false);


    const handleDelete = () => {
        //this is a function that deletes the comment on click, it is passed down to the EllipsisButton component
        const deleteItem = async () => {
        try {
            await axiosRes.delete(`/comment/${id}/`)
        } catch (error) {
            
        }}
        deleteItem();
        setComments((prevComments) => ({
            ...prevComments,
            results: prevComments.results.filter((comment) => comment.id !== id),
        }))}

    const handleEdit = () => {
        setShowEditForm(true);
    }


  return (
    <Card fluid="true" className='my-3'>
        <Card.Body className='border-bottom'>
            <Col fluid className="d-flex">
                <div className='align-self-center mb-2'>
                    <Link to={`/profiles/${id}`}>
                        <Avatar src={profile_image} text={owner} />
                    </Link>      
                </div>     
                <div className='ms-auto align-self-center text-muted'>
                    Created: {created_at}
                </div>
                {is_owner && !showEditForm &&
                    <EllipsisButton isType="comment" id={id} handleDelete={handleDelete} handleEdit={handleEdit} />
                }
            </Col>
            {showEditForm ? (
                <CommentEditForm
                    id={id}
                    profile_id={profile_id}
                    content={content}
                    profileImage={profile_image}
                    setComments={setComments}
                    setShowEditForm={setShowEditForm}
                />
            ) : (
                <>
                    <p className='d-flex pt-3 ps-2 ms-auto border-top'>{content}</p>
                </>
            )}
        </Card.Body>
    </Card>
  )
}
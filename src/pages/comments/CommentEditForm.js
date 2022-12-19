import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentEditForm({ id, content, setShowEditForm, setComments }) {

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comment/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
              ...comment,
              content: formContent.trim(),
              updated_at: "now",
            }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="d-flex">
        <Button
          className="my-2"
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </Button>
        <Button
          className="ms-2 my-2"
          disabled={!content.trim()}
          type="submit"
        >
          save
        </Button>
      </div >
    </Form >
  );
}

export default CommentEditForm;
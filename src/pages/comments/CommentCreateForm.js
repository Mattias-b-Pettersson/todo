import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { Row } from "react-bootstrap";


function CommentCreateForm(props) {
  const { todo, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        todo,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
            <div className="d-inline mt-3">
                    <Link to={`/profiles/${profile_id}`} className="d-inline mx-0">
                        <Avatar src={profileImage} />
                    </Link>
                    <p className="d-inline mx-0">Create a comment:</p>
            </div>
          <Form.Control
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
            className="w-100 rounded"
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`ms-auto mt-2 btn d-block`}
        disabled={!content.trim()}
        type="submit"
      >
        Post
      </button>
    </Form>
  );
}

export default CommentCreateForm;


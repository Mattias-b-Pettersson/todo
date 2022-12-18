import React, { useEffect, useRef, useState } from 'react'
import { Col, Card, Row, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import loading from "../../assets/loading.gif"
import styles from "../../styles/TodoCreateEditForm.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';

export const TodoEditForm = () => {
  const [profiles, setProfiles] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [todoData, setTodoData] = useState({
    title: "",
    content: "",
    priority: "",
    state: "",
    assigned: "",
    file: "",
  })

  const navigate = useNavigate();

  const { title, content, priority, state, assigned, file } = todoData;

  const fileInput = useRef(null)

  const { id } = useParams();

  useEffect(() => {
        Promise.all([
            axiosReq.get("/profiles/"),
            axiosReq.get(`/todo/${id}/`)
        ])
        .then((all) => {
            setProfiles(all[0].data)
            setTodoData(all[1].data)
            setLoaded(true)
        })
        .catch((error) => {
            setErrors(error.response?.data)
        })
    }, [])


  const handleChangeFile = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(file);
      setTodoData({
        ...todoData,
        file: URL.createObjectURL(event.target.files[0])
      })
    }
  }

  const handleChange = (event) => {
    if (event.target.name === "assigned") {
      setTodoData({
        ...todoData,
        [event.target.name]: [].slice.call(event.target.selectedOptions).map(item => item.value)

      })
      console.log(assigned)
    } else {
      setTodoData({
        ...todoData,
        [event.target.name]: event.target.value,

      });
    }
  };


 const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title)
    formData.append("content", content)
    formData.append("priority", priority)
    formData.append("assigned", assigned)
    formData.append("state", state)

    // Needs this if statement, or else the API wont accept an empty file field. 
    // So if no file is selected the form wont send any data for file.
    if (fileInput.current.value) {
      formData.append("file", fileInput.current.files[0])
    }
    
   
    for (const value of formData.values()) {
      console.log(value);
    }

    try {
    await axiosReq.put(`/todo/${id}`, formData)
    navigate(`/todo/${id}`)
    
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <Row fluid="true" className="justify-content-center">
      <Col xl={8} lg={10} className='mt-3'>
        <Card>
          <h1 className="mt-4">Update todo <FontAwesomeIcon icon={faRetweet} className="mx-auto" /></h1>
          {/* makes sure everythins is loaded before displaying form */}
          {loaded ? (
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="title">

                <Row className="justify-content-center">
                  <Col xs={12} md={2}>
                    <Form.Label className="fs-3 pt-0">Title:</Form.Label>
                  </Col>
                  <Col md={8} className="pt-1"><Form.Control
                    type="text"
                    placeholder="Enter title here"
                    name="title"
                    required
                    onChange={handleChange}
                    value={title}
                  /></Col>
                </Row>

              </Form.Group>
              {errors.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-4" controlId="content">

                <Row className="justify-content-center">
                  <Col xs={12} md={2}>
                    <Form.Label className="fs-3 pt-0">Content:</Form.Label>
                  </Col>
                  <Col md={8} className="pt-1"><Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter content here"
                    name="content"
                    onChange={handleChange}
                    value={content}
                  />
                  </Col>
                </Row>

              </Form.Group>
              {errors.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-4" controlId="priority" >

                <Row className="justify-content-center">
                  <Col xs={12} md={2}>
                    <Form.Label className="fs-3 pt-0">Priority:</Form.Label>
                  </Col>
                  <Col md={8} className="pt-1 d-flex justify-content-start" >
                    <Form.Control name="priority" as="select" onChange={handleChange} value={priority}>
                      <option name="1">1</option>
                      <option name="2">2</option>
                      <option name="3">3</option>
                    </Form.Control>
                  </Col>
                </Row>

              </Form.Group>
              {errors.priority?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-4" controlId="state">

                <Row className="justify-content-center">
                  <Col xs={12} md={2}>
                    <Form.Label className="fs-3 pt-0">State:</Form.Label>
                  </Col>
                  <Col md={8} className="pt-1">
                    <Form.Control name="state" as="select" onChange={handleChange} value={state}>
                      <option value="todo">Todo</option>
                      <option value="in_progress">In progress</option>
                      <option value="on_hold">On hold</option>
                      <option value="done">Done</option>
                    </Form.Control>
                  </Col>
                </Row>

              </Form.Group>
              {errors.state?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-4" controlId="assigned">

                <Row className="justify-content-center">
                  <Col xs={12} md={2}>
                    <Form.Label className="fs-3 pt-0">Assign:</Form.Label>
                    <p className='fw-light text-muted'>Hold control to select multiple</p>
                  </Col>
                  <Col md={8} className="pt-1">

                    
                      <Form.Control as="select" name="assigned" multiple onChange={handleChange} required>

                        {profiles.results?.map((profile) => (
                          <option value={String(profile.id)} key={profile.id}>{profile.owner}</option>
                        ))}
                      </Form.Control>
                    
                  </Col>
                </Row>

              </Form.Group>
              {errors.assigned?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group className="mb-4" controlId="file">

                <Row className="justify-content-center">
                  <Col xs={12} md={2}>
                    <Form.Label className="fs-3 pt-0">File:</Form.Label>
                  </Col>
                  <Col md={8} className="pt-1">
                    <Form.File
                      className="d-flex justify-content-start mt-1"
                      name="file"
                      onChange={handleChangeFile}
                      ref={fileInput}
                    />

                  </Col>
                </Row>

              </Form.Group>
              {errors.file?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Button type="submit" className={styles.submitBtn}>
                Update!
              </Button>
            </Form>
          </Card.Body>
          ) : (
            <img src={loading} height={102} width={102} alt="loading..." className='mx-auto my-5'/>
          )}

        </Card>
      </Col>
    </Row>
  )
}
import React, { useEffect, useRef, useState } from 'react'
import { Col, Card, Row, Form, Button, Alert } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults';
import loading from "../../assets/loading.gif"
import styles from "../../styles/TodoCreateEditForm.module.css"

export const TodoCreateForm = () => {
  const [profiles, setProfiles] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [todoData, setTodoData] = useState({
    title: "",
    content: "",
    priority: "1",
    state: "todo",
    assigned: "",
    file: "",
  })

  const { title, content, priority, state } = todoData;

  const fileInput = useRef(null)

  useEffect(() => {
    async function handleMount() {
      try {
        const { data } = await axiosReq.get("/profiles/")
        setProfiles({ data })
        setLoaded(true)
      } catch (error) {
        setErrors(error.response?.data)
      }
    }
    handleMount()
  }, []);

  const handleChangeFile = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(file);
      setTodoData({
        ...todoData,
        file: URL.createObjectURL(event.target.files[0])
      })
    }
    console.log(fileInput.current.value)
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
    if (fileInput.current.value) {
      formData.append("file", fileInput.current.files[0])
    }


    for (const value of formData.values()) {
      console.log(value);
    }

    try {
      await axiosReq.post("/todos/", formData)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <Row fluid="true" className="justify-content-center">
      <Col xl={8} lg={10} className='mt-3'>
        <Card>
          <h1 className="mt-4">New Todo</h1>
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

                    {loaded ? (
                      <Form.Control as="select" name="assigned" multiple onChange={handleChange} required>

                        {profiles.data?.results.map((profile) => (
                          <option value={profile.id} key={profile.id}>{profile.owner}</option>
                        ))}
                      </Form.Control>
                    ) : (
                      <img src={loading} height={102} alt="loading..." />
                    )}

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
                Create!
              </Button>
            </Form>
          </Card.Body>

        </Card>
      </Col>
    </Row>
  )
}

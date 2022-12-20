import React from 'react'
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import notFound from "../assets/404.jpg"

export const NotFound = () => {
  return (
    <Col xs={10} className="mx-auto">
      <Card>
        <img className="rounded mt-5 w-100" src={notFound} alt='404'/>
        <p className='fs-2'>Page not found!</p>
      </Card>
    </Col>
  )
}

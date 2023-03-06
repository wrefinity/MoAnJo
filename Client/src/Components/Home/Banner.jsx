import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import model from "../../assets/img/model.png"

const Banner = () => {
    return (
        <div className='banner'>
            <Row className="justify-content-center align-items-center">
                <Col md={6} className="text-center">
                    <h1>Welcome to MoAnJo  Shopping Store!</h1>
                    <p>MoAnJo is a Software for ALX portfolio project</p>
                    <Button variant="danger" size="lg">
                        Shop Now
                    </Button>
                </Col>
                <Col md={6}>
                    <img
                        src={model}
                        style={{
                            height: "100vh",
                        }}
                        alt="ecommerce store"
                        className="img-fluid"
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Banner
import React from 'react'
import { Row, Button, Form } from 'react-bootstrap';
function Contact() {
    return (
        <Row className='className="mt-5 pt-5 mb-5 justify-content-center align-items-center'>
            <Form className='col-md-5 mt-5'>
                <h2 className='text-center'>Contact Us</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        Your email address is save with us
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="enter subject" />
                </Form.Group>
                <Button variant="danger" type="submit">
                    Submit
                </Button>
            </Form>
        </Row>
    );
}

export default Contact
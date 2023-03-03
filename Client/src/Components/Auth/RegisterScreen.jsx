import React from 'react'
import { Row, Container, Col } from "react-bootstrap"
import RegisterForm from "./RegisterForm";

const RegisterScreen = () => {
    return (
        <Container fluid className="mt-5 pt-2 mb-5 ">
            <Row className="justify-content-center align-items-center mt-5 pt-5">
                <Col md={10}>
                    <RegisterForm />
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterScreen
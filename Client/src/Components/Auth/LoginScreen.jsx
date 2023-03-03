import React from 'react'
import { Row, Container, Col } from "react-bootstrap"
import LoginForm from "./LoginForm";

const LoginScreen = () => {
    return (
        <Container fluid className="mt-5 p-5 ">
            <Row className="justify-content-center align-items-center mt-5 pt-5">
                <Col md={6}>
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    );
}

export default LoginScreen
import React, { useRef, useEffect, useState } from "react";
import { Row, Col, InputGroup, Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import {
    handleInput,
    loaderSize,
    loaderColor,
    validate,
} from "../../Utils/InputHelpers";
import { registerUser, reseter } from "../../Slicer/Auth";
const RegisterForm = () => {
    const { status, message } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        country: '',
        state: '',
        city: '',
        street_name: '',
        zipcode: ''
    })
    const reset = () => {
        setFormData({
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password: '',
            country: '',
            state: '',
            city: '',
            street_name: '',
            zipcode: ''
        });
    };
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const referal = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, navigate, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formData));
        setIsSubmit(true);
    };

    const dispatchCreation = () => {
        if (
            Object.keys(formErrors).length === 0 &&
            isSubmit &&
            status === "idle"
        ) {
            const formData = new FormData();
            dispatch(registerUser(formData));
            setIsSubmit(false)
        }
        if (status === "succeeded" && message !== "") {
            toast.success("User registered ", { autoClose: 2000 });
            reset();
            reseter();
            setIsSubmit(false)
            setTimeout(() => navigate("/login"), 1000);
        }

        if (status === "failed") {
            toast.error(message, { autoClose: 2000 });
            setIsSubmit(false)
        }
    };
    referal.current = dispatchCreation;
    return (

        <Row>
            <Col md={12} sm={12}>
                <h2 className="text-center mb-5 bg-danger p-4 text-light">
                    <i>
                        Sign-Up
                    </i>
                </h2>

                <Form onSubmit={handleSubmit}>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>First and last name</InputGroup.Text>
                        <Form.Control aria-label="First name" name="first_name" value={formData.first_name} onChange={(e) => handleInput(e, setFormData)} />
                        <Form.Control aria-label="Last name" name="last_name" value={formData.last_name} onChange={(e) => handleInput(e, setFormData)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Username and password</InputGroup.Text>
                        <Form.Control aria-label="username" name="username" value={formData.username} onChange={(e) => handleInput(e, setFormData)} />
                        <Form.Control aria-label="password" name="password" value={formData.password} onChange={(e) => handleInput(e, setFormData)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Email and Phone</InputGroup.Text>
                        <Form.Control aria-label="email" name="email" value={formData.email} onChange={(e) => handleInput(e, setFormData)} />
                        <Form.Control aria-label="phone" name="phone" value={formData.phone} onChange={(e) => handleInput(e, setFormData)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Country and State</InputGroup.Text>
                        <Form.Control aria-label="country" name="country" value={formData.country} onChange={(e) => handleInput(e, setFormData)} />
                        <Form.Control aria-label="state" name="state" value={formData.state} onChange={(e) => handleInput(e, setFormData)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>City and Street</InputGroup.Text>
                        <Form.Control aria-label="city" name="city" value={formData.city} onChange={(e) => handleInput(e, setFormData)} />
                        <Form.Control aria-label="zipcode" name="zipcode" value={formData.zipcode} onChange={(e) => handleInput(e, setFormData)} />
                        <Form.Control aria-label="state" name="street_name" value={formData.street_name} onChange={(e) => handleInput(e, setFormData)} />
                    </InputGroup>

                    <div>
                        {status === "loading" ? (
                            <LineWave
                                color={loaderColor}
                                height={loaderSize}
                                width={loaderSize}
                            />
                        ) : (
                            <Button variant="danger" type="submit">
                                Submit
                            </Button>
                        )}

                    </div>
                </Form>

            </Col>
        </Row>

    )
}

export default RegisterForm
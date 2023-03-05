import React, { Fragment, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { LineWave } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import {
    handleInput,
    loaderSize,
    loaderColor,
    validateEmpty,
} from "../../Utils/InputHelpers";
import { createCategories, reseter } from "../../Slicer/Category"

const CategoryForm = () => {
    const { status, message } = useSelector((state) => state.categories);
    const [category, setCategory] = useState({
        name: ""
    })
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const referal = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, dispatch]);


    const reset = () => {
        setCategory({
            name: "",
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Categry Created Called")
        setFormErrors(validateEmpty(category));
        setIsSubmit(true);
    };

    const dispatchCreation = () => {
        if (
            Object.keys(formErrors).length === 0 &&
            isSubmit &&
            status === "idle"
        ) {
            try {
                dispatch(reseter());
                dispatch(createCategories(category));
                setIsSubmit(false);
            } catch (error) { }
        }
        if (status === "succeeded") {
            toast.success("category created successfully", { autoClose: 2000 });
            reset();
            dispatch(reseter());
            setIsSubmit(false);
            setTimeout(() => navigate("/categories"), 1000);
        }
        if (formErrors?.all?.length > 1) {
            toast.error(formErrors?.all, { autoClose: 2000 });
        }
        if (status === "failed") {
            toast.error(message, { autoClose: 2000 });
            dispatch(reseter());
            setIsSubmit(false);
        }
    };
    referal.current = dispatchCreation;

    return (

        <Fragment>

            <Container fluid className="mt-5 mb-5 pt-5">
                <Row className="justify-content-center align-items-center">

                    <Col md={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Category Title</Form.Label>
                                <Form.Control name="name" type="text" placeholder="enter category name" value={category.name} onChange={(e) => handleInput(e, setCategory)} />
                            </Form.Group>

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

            </Container>

        </Fragment>

    );
}

export default CategoryForm
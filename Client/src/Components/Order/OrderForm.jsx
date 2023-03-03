import React, { Fragment, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col, FloatingLabel } from "react-bootstrap"
import { LineWave } from "react-loader-spinner";
import {
    handleInput,
    loaderSize,
    loaderColor,
    validateEmpty,
} from "../../Utils/InputHelpers";
import {
    createOrder,
    reseter,
} from "../../Slicer/Order";
import { fetchOrder, createOrder } from "../../Slicer/Order";
import { useNavigate } from "react-router-dom";

export const OrderForm = () => {
    const navigate = useNavigate();
    const categories = useSelector(fetchOrder);

    const [orderData, setOrderData] = useState(
        {
            total_cost: "",
            delivered_at: "",
            delivery_status: "",
            customer_id: "",
            products_id: "",
        }
    )

    const { status, message } = useSelector((state) => state.products);
    const OrderStatus = ['pending', 'delivered']
    const orderOption = !OrderStatus
        ? ""
        : Array.from(OrderStatus)
            .sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            .map((ord, index) => {
                return (
                    <option key={index} value={ord}>
                        {ord}
                    </option>
                );
            });

    const reset = () => {
        setOrderData({
            total_cost: "",
            delivered_at: "",
            delivery_status: "",
            delivery_address: "",
            customer_id: "",
            products_id: "",
        });
    };
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const referal = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validateEmpty(orderData));
        setIsSubmit(true);
    };

    const dispatchCreation = () => {
        if (
            Object.keys(formErrors).length === 0 &&
            isSubmit &&
            status === "idle"
        ) {
            dispatch(reseter());
            dispatch(createOrder(orderData));
            setIsSubmit(false);
        }
        if (status === "succeeded") {
            toast.success("order created successfully", { autoClose: 2000 });
            reset();
            dispatch(reseter());
            setIsSubmit(false);
            setTimeout(() => navigate("/shop"), 1000);
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
                        <h2 className="text-center text-uppercase"> Place Your Order</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>product Title</Form.Label>
                                <Form.Control name="title" type="text" placeholder="enter product title" value={orderData.title} onChange={(e) => handleInput(e, setOrderData)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="category_id"
                                    onChange={(e) => handleInput(e, setOrderData)}>
                                    <option>Select Product Category</option>
                                    {orderOption}
                                </Form.Select>
                            </Form.Group>
                            <FloatingLabel controlId="floatingTextarea2" label="Description">
                                <Form.Control
                                    as="textarea"
                                    value={orderData.delivery_address}
                                    onChange={(e) => handleInput(e, setOrderData)}
                                    name="delivery_address"
                                    placeholder="delivery address"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel>
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

    )
}

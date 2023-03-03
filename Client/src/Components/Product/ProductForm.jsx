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
    createProduct,
    reseter,
} from "../../Slicer/Product";
import { fetchcategories } from "../../Slicer/Category";
import { useNavigate } from "react-router-dom";

export const ProductForm = () => {
    const navigate = useNavigate();
    const categories = useSelector(fetchcategories);

    const [productData, setProductData] = useState(
        {
            title: "",
            image: "",
            price: "",
            quantity: "",
            description: "",
            category_id: "",
        }
    )

    const { status, message } = useSelector((state) => state.products);

    const categoriesOption = !categories
        ? ""
        : Array.from(categories)
            .sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            .map((cat) => {
                return (
                    <option key={cat._id} value={cat._id}>
                        {cat.name}
                    </option>
                );
            });

    const reset = () => {
        setProductData({
            title: "",
            image: "",
            price: "",
            quantity: "",
            description: "",
            category_id: "",
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
        setFormErrors(validateEmpty(productData));
        setIsSubmit(true);
    };

    const dispatchCreation = () => {
        if (
            Object.keys(formErrors).length === 0 &&
            isSubmit &&
            status === "idle"
        ) {
            dispatch(reseter());
            dispatch(createProduct(productData));
            setIsSubmit(false);
        }
        if (status === "succeeded") {
            toast.success("product created successfully", { autoClose: 2000 });
            reset();
            dispatch(reseter());
            setIsSubmit(false);
            setTimeout(() => navigate("/products"), 1000);
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
                        <h2 className="text-center text-uppercase"> Product Form</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>product Title</Form.Label>
                                <Form.Control name="title" type="text" placeholder="enter product title" value={productData.title} onChange={(e) => handleInput(e, setProductData)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control name="price" type="text" placeholder="enter product price" value={productData.price} onChange={(e) => handleInput(e, setProductData)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Product Quantity</Form.Label>
                                <Form.Control name="quantity" type="text" placeholder="enter product quantity" value={productData.quantity} onChange={(e) => handleInput(e, setProductData)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Product Category</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="category_id"
                                    onChange={(e) => handleInput(e, setProductData)}>
                                    <option>Select Product Category</option>
                                    {categoriesOption}
                                </Form.Select>
                            </Form.Group>
                            <FloatingLabel controlId="floatingTextarea2" label="Description">
                                <Form.Control
                                    as="textarea"
                                    value={productData.description}
                                    onChange={(e) => handleInput(e, setProductData)}
                                    name="description"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Product Image Link</Form.Label>
                                <Form.Control name="quantity" type="text" placeholder="enter product image link" value={productData.image} onChange={(e) => handleInput(e, setProductData)} />
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

    )
}

import React from 'react'
import { Container } from 'react-bootstrap'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchcategories } from "../../Slicer/Category";
import {
    deleteProduct,
    fetchProduct,
    getProduct,
    reseter,
} from "../../Slicer/Product";

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(fetchProduct);
    const categories = useSelector(fetchcategories);
    const { status } = useSelector((state) => state.products);

    useEffect(() => {
        if (status === "succeeded") {
            dispatch(getProduct());
        }
    }, [status]);

    const navigate = useNavigate();
    const productInfo = products.map((product) => {
        const category = categories?.filter(
            (category) => product.category_id === category.id
        )[0];
        return (
            <tr key={product.id}>
                <td>
                    <img
                        src={`${product.image}`}
                        alt={product.name}
                        className="p-2"
                        height={80}
                        width={80}
                    />
                </td>
                <td className="p-2">{product.created_at}</td>
                <td className="p-2">{product.title}</td>
                <td className="p-2">{product?.price}</td>
                <td className="p-2">{category['name'] ?? ""}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{product.description}</td>
                <td className="p-2">
                    <button
                        className="btn btn-sm btn-primary m-1"
                        onClick={() => {
                            navigate(`/product/${product.id}`);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-sm btn-danger m-1"
                        onClick={() => {
                            dispatch(deleteProduct(product));
                            reseter();
                        }}
                    >
                        delete
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <Container fluid>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Date</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Description</th>
                        <th scope="col">Control</th>
                    </tr>
                </thead>
                <tbody>
                    {productInfo}
                </tbody>
            </table>
        </Container>
    )
}

export default ProductList
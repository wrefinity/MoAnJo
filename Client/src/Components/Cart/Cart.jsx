import React from 'react';
import { Container, Table, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { fetchCart, deleteCart } from '../../Slicer/Cart';


const Cart = () => {
    const userx = localStorage.getItem("user")
        ? localStorage.getItem("user")
        : null;
    const user = JSON.parse(userx);
    const cart = useSelector(fetchCart);
    const cartList = Array.from(cart)
        ?.map((cat) => {
            return (
                <tr key={cat.id}>
                    <td>{cat?.created_at}</td>
                    <td>{cat?.name}</td>
                    <td>{cat?.product_id}</td>
                    <td>{cat?.unit_price}</td>
                    <td>{cat?.quantity}</td>
                    <td>{cat?.total_cost}</td>
                    <td className="p-2">
                        <button
                            className="btn btn-sm btn-primary m-1"
                            onClick={() => {
                                deleteCart({ cartId: cat.id, userId: user.id });
                            }}
                        >
                            Delete
                        </button>
                    </td>
                </tr>

            );
        });

    return (

        <Container fluid>
            <Row className='justify-content-center align-items-center'>
                <Col md={6}>
                    <Table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Date</th>
                                <th scope="col">Product</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Sub-Total</th>
                                <th scope="col">Control</th>
                            </tr>
                            {cartList}
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart
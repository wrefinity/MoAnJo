import React from 'react';
import { Container, Table, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { fetchOrder, deleteOrder } from '../../Slicer/Order';
import { fetchProduct } from '../../Slicer/Product';
import { fetchUsers } from '../../Slicer/Users';


const OrderList = () => {
    const userx = localStorage.getItem("user")
        ? localStorage.getItem("user")
        : null;
    const user = JSON.parse(userx);
    const orders = useSelector(fetchOrder);
    const products = useSelector(fetchProduct);
    const users = useSelector(fetchUsers);
    const orderList = Array.from(orders)
        ?.map((order) => {
            return (
                <tr key={order.id}>
                    <td>{order?.created_at}</td>
                    <td>{users?.find(us => us?.id === order?.customer_id)["username"]}</td>
                    <td>{products?.find(p => p?.id == order?.products_id)['title']}</td>
                    <td>{order?.total_cost}</td>
                    <td>{order?.delivery_status}</td>
                    <td>{order?.delivery_address}</td>
                    <td>{order?.phone_number}</td>

                    <td className="p-2">
                        <button
                            className="btn btn-sm btn-primary m-1"
                            onClick={() => {
                                deleteOrder({ id: order.id });
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
                                <th scope="col">Customer</th>
                                <th scope="col">Product</th>
                                <th scope="col">Total Cost</th>
                                <th scope="col">Delivery Status</th>
                                <th scope="col">Delivery Address</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Control</th>
                            </tr>
                            {orderList}
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderList
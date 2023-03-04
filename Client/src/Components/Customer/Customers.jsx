import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    deleteUser,
    fetchUsers,
    getUsers,
    reseter,
} from "../../Slicer/Users";

const Customers = () => {
    const customers = useSelector(fetchUsers);
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.customers);

    useEffect(() => {
        if (status === "succeeded") {
            dispatch(getUsers());
        }
    }, [status]);

    const navigate = useNavigate();
    const customerInfo = customers.map((customer) => {
        return (
            <tr key={customer._id}>
                <td>
                    {customer.created_at}
                </td>
                <td className="p-2">
                    {customer.first_name} <br />
                    {customer.last_name} <br />
                    UserName: {customer.username}
                </td>
                <td className="p-2">
                    {customer?.email} <br />
                    {customer?.phone}
                </td>
                <td className="p-2">
                    {customer?.country} <br />
                    {customer?.state} <br />
                    {customer?.city} <br />

                </td>
                <td className="p-2">{customer.street_name}</td>
                <td className="p-2">{customer.zipcode}</td>
                <td className="p-2">
                    <Button
                        className="btn btn-sm btn-primary m-1"
                        onClick={() => {
                            navigate(`/customer/${customer._id}`);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        className="btn btn-sm btn-danger m-1"
                        onClick={() => {
                            dispatch(deleteUser(customer));
                            reseter();
                        }}
                    >
                        delete
                    </Button>
                </td>
            </tr>
        );
    });

    return (
        <Container fluid>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Fullname</th>
                        <th scope="col">Email/Phone</th>
                        <th scope="col">Country/State/City</th>
                        <th scope="col">Street</th>
                        <th scope="col">Zip Code</th>
                        <th scope="col">Control</th>
                    </tr>
                </thead>
                <tbody>
                    {customerInfo}
                </tbody>
            </table>
        </Container>
    )
}

export default Customers
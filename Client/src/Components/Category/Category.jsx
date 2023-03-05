import React from 'react';
import { Container, Table, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { fetchcategories, deleteCategories } from '../../Slicer/Category';
const Category = () => {

    const categories = useSelector(fetchcategories);
    const categoryList = Array.from(categories)
        ?.map((cat) => {
            return (
                <tr key={cat.id}>
                    <td>{cat?.id}</td>
                    <td>{cat?.created_at}</td>
                    <td>{cat?.name}</td>
                    <td className="p-2">
                        <button
                            className="btn btn-sm btn-primary m-1"
                            onClick={() => {
                                deleteCategories(cat.id);
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
                                <th scope="col">name</th>
                                <th scope="col">Control</th>
                            </tr>
                            {categoryList}
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Category
import React from 'react'
import { Container, Row } from 'react-bootstrap'
import ProductList from './ProductList'
import ProductForm from './ProductForm'

const ProductScreen = () => {
    return (
        <Container>
            <Row>
                <ProductForm />
                <ProductList />
            </Row>
        </Container>
    )
}


export default ProductScreen
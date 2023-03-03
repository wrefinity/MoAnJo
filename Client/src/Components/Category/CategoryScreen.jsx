import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Category from './Category'
import CategoryForm from './CategoryForm'

const CategoryScreen = () => {
    return (
        <Container>
            <Row>
                <CategoryForm />
                <Category />
            </Row>
        </Container>
    )
}

export default CategoryScreen
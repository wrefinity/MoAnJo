import React, { Fragment } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Banner from './Banner';
import { fetchProduct } from "../../Slicer/Product";

const LandingPage = () => {
  const products = useSelector(fetchProduct);
  const shopItems = products?.map((product) => {
    return (
      <Col md={4} className="text-center">
        <Card>
          <Card.Img
            variant="top"
            src={product.image}
            className="product_img"
            alt="product"
          />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Title>{product.price}</Card.Title>
            <Card.Text>
              {product.description}
            </Card.Text>
            <Link to={`/order/${product.id}`}>

              <Button variant="danger">Buy Now</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  });


  return (
    <Fragment>
      <Container fluid>
        <Banner />
        <Row >
          <h3 className='text-center title-header '>Products</h3>
        </Row>
        <Row className="my-5">
          {shopItems}
        </Row>
      </Container>

    </Fragment>
  );
};

export default LandingPage;

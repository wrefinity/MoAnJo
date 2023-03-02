import React, { Fragment } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import shoe from "../../assets/img/jordan.png"
import sneakers from "../../assets/img/snikkers.png"
import HeadNav from '../HeadNav';
import Banner from './Banner';
import Footer from '../Footer';
const LandingPage = () => {
  return (
    <Fragment>
      <HeadNav />
      <Container fluid>
        <Banner />
        <Row >
          <h3 className='text-center title-header '>Products</h3>
        </Row>
        <Row className="my-5">
          <Col md={4} className="text-center">
            <Card>
              <Card.Img
                variant="top"
                src={sneakers}
                className="product_img"
                alt="product"
              />
              <Card.Body>
                <Card.Title>Product 1</Card.Title>
                <Card.Text>
                  This is a short description of Product 1. It's really cool and
                  you should definitely buy it.
                </Card.Text>
                <Button variant="danger">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <Card>
              <Card.Img
                variant="top"
                src={shoe}
                className="product_img"
                alt="product"
              />
              <Card.Body>
                <Card.Title>Product 2</Card.Title>
                <Card.Text>
                  This is a short description of Product 2. It's really cool and
                  you should definitely buy it.
                </Card.Text>
                <Button variant="danger">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <Card>
              <Card.Img
                variant="top"
                className="product_img"
                src={sneakers}
                alt="product"

              />
              <Card.Body>
                <Card.Title>Product 3</Card.Title>
                <Card.Text>
                  This is a short description of Product 3. It's really cool and
                  you should definitely buy it.
                </Card.Text>
                <Button variant="danger">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>

    </Fragment>
  );
};

export default LandingPage;

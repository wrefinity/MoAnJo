import React, { Fragment } from 'react'
import { Row, Container } from 'react-bootstrap';

const About = () => {
    return (
        <Fragment >
            <Container fluid className="mt-5 pt-5 mb-5">
                <h3 className='text-center'> About-Us</h3>
                <Row className="justify-content-center">

                    <div className="col-md-6 align-items-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptas sapiente est consectetur voluptatem commodi saepe
                        molestias consequatur error dolor sequi a illo eius,
                        quia eveniet porro, rem repellendus, numquam laudantium.
                    </div>
                </Row>
            </Container>

        </Fragment>
    );
}

export default About

import React from 'react'
import { Row, Button, Form, Container } from 'react-bootstrap';
import { faHome, faPhone, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Contact() {
    return (

        <Container fluid>
            <Row className='className="mt-5 pt-5 mb-5 justify-content-center align-items-center'>

                <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
                <p class="text-center text-danger w-responsive mx-auto mb-5">
                    <i>
                        for any issue don't hestitate to contact us
                    </i>
                </p>

                <Row>

                    <div class="col-md-6 mb-md-0 mb-5">
                        <Form id="contact-form">

                            <Row>
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="name" name="name" class="form-control" />
                                        <label for="name" class="">Your name</label>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="email" name="email" class="form-control" />
                                        <label for="email" class="">Your email</label>
                                    </div>
                                </div>
                            </Row>

                            <Row>
                                <div class="col-md-12">
                                    <div class="md-form mb-0">
                                        <input type="text" id="subject" name="subject" class="form-control" />
                                        <label for="subject" class="">Subject</label>
                                    </div>
                                </div>
                            </Row>


                            <div class="row">


                                <div class="col-md-12">

                                    <div class="md-form">
                                        <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                                        <label for="message">Your message</label>
                                    </div>

                                </div>
                            </div>

                            <Button variant="danger" className='mt-2 col-md-12'>Send</Button>

                        </Form>
                        <div class="status"></div>
                    </div>

                    <div class="col-md-6 text-center">
                        <ul class="list-unstyled mb-0">
                            <li>
                                <p><FontAwesomeIcon icon={faHome} /> Abuja Municipal, Abuja, Nigeria</p>
                            </li>

                            <li><i class=" mt-4 fa-2x"></i>
                                <p> <FontAwesomeIcon icon={faPhone} /> +234 9121257575</p>
                            </li>

                            <li><i class="mt-4 fa-2x"></i>
                                <p> <FontAwesomeIcon icon={faMessage} /> moanjo@gmail.com</p>
                            </li>
                        </ul>
                    </div>

                </Row>
            </Row>
        </Container>
    );
}

export default Contact
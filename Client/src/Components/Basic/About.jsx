import React, { Fragment } from 'react'
import { Row, Container, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import wrash from "../../assets/img/wrash.jpg"
import monday from "../../assets/img/monday.jpeg"
import jkPic from "../../assets/img/jk.JPG"
import { FaGit, FaPhoneAlt, FaGooglePlusG, FaLinkedin } from "react-icons/fa";
const About = () => {
    return (
        <Fragment >
            <Container fluid className="mt-5 pt-5 mb-5">
                <h3 className='text-center'> About-Us</h3>
                <Row className="justify-content-center mb-4">

                    <Col className="col-md-6 d-flex" >
                        <Col md={4} className="text-center heit">
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={wrash}
                                    className="pro_img"
                                    alt="wrash"
                                />
                                <Card.Body>
                                    <Card.Title>Andrew Ishaku Wreford</Card.Title>
                                    <Card.Text> <i>Backend Role</i></Card.Text>
                                    <Card.Text>
                                        +9121257575 <br />
                                        <i>
                                            wrefordmessi@gmail.com <br />
                                        </i>
                                        <span className='flex-cls'>
                                            <FaGooglePlusG />
                                            <Link to={"https://github.com/wrefinity/"}> <FaGit className="text-danger " /> </Link> <br />
                                            <Link to={"https://www.linkedin.com/in/ishaku-wreford-andrew-87b334181"}> <FaLinkedin className="text-danger " /> </Link>
                                            <FaPhoneAlt />
                                        </span>
                                    </Card.Text>
                                </Card.Body>

                            </Card>

                        </Col>
                        <Col md={4} className="text-center heit">

                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={monday}
                                    className="pro_img"
                                    alt="monady"
                                />
                                <Card.Body>
                                    <Card.Title>Monday Odoh</Card.Title>
                                    <Card.Text> <i>Database Engineer</i></Card.Text>
                                    <Card.Text>
                                        +2347030489608 <br />
                                        <i>
                                            mondayodoh94@gmail.com <br />
                                            ..
                                        </i>
                                        <span className='flex-cls'>
                                            <FaGooglePlusG />
                                            <Link to={"https://github.com/Monemax94/"}> <FaGit className="text-danger " /> </Link> <br />
                                            <Link to={"https://www.linkedin.com/in/monday-odoh-091090171/"}> <FaLinkedin className="text-danger " /> </Link>
                                            <FaPhoneAlt />
                                        </span>
                                    </Card.Text>
                                </Card.Body>

                            </Card>
                        </Col>
                        <Col md={4} className="text-center heit">

                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={jkPic}
                                    className="pro_img"
                                    alt="wrash"
                                />
                                <Card.Body>
                                    <Card.Title>JohnKennedy Ogu</Card.Title>
                                    <Card.Text> <i>FrontEnd Role</i></Card.Text>
                                    <Card.Text>
                                        +234 813 106 8343 <br />
                                        <i>
                                            ogujohnkennedy@gmail.com<br />
                                        </i>
                                        <span className='flex-cls'>
                                            <FaGooglePlusG />
                                            <Link to={"https://github.com/mathjken/"}> <FaGit className="text-danger " /> </Link> <br />
                                            <Link to={"https://www.linkedin.com/in/ogu-johnkennedy-bb7424100"}> <FaLinkedin className="text-danger " /> </Link>
                                            <FaPhoneAlt />
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Col>
                </Row>
                <Row className="justify-content-center">

                    <div className="col-md-6 align-items-center abt">
                        Welcome to MoAnJo online Shopping Mall! We are a dedicated team of professionals
                        from Alx-Holbernton School.
                        This is a portfolio project and part of the requirement to complete
                        the foundation course of the software Engineering program. we are passionate about providing high-quality products to customers online.
                        Our goal is to make your shopping experience easy, convenient, and enjoyable.
                        We believe that online shopping should be stress-free and fun.
                        That's why we have created a platform that offers a wide range of products at competitive prices. Whether you are looking for clothing, electronics, home decor, or beauty products, you can find it all here.
                        <p></p><b>Our mission</b> is to provide you with the best possible shopping experience. We understand that every customer has unique needs and preferences, and we strive to cater to those needs.
                        We work hard to ensure that our website is user-friendly, informative, and easy to navigate.
                        Our team is comprised of experienced professionals who are dedicated to providing excellent customer service. We are always here to answer your questions, address your concerns, and assist you in any way we can.
                        <p></p>Our goal is to make sure that you are completely satisfied with your purchase.
                        We take great pride in offering high-quality products at affordable prices.
                        We work with reputable suppliers to ensure that our products are of the highest quality. We are constantly adding new products to our inventory, so be sure to check back often for the latest and greatest.
                        <p></p>Thank you for choosing MoAnJo. We look forward to serving you and providing you with an exceptional shopping experience. If you have any questions or comments, please do not hesitate to contact us.

                    </div>
                </Row>
            </Container>

        </Fragment >
    );
}

export default About


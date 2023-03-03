import React, { Fragment } from 'react'
import { Row, Container } from 'react-bootstrap';

const About = () => {
    return (
        <Fragment >
            <Container fluid className="mt-5 pt-5 mb-5">
                <h3 className='text-center'> About-Us</h3>
                <Row className="justify-content-center">

                    <div className="col-md-6 align-items-center">
                        Welcome to MoAnJo online Shopping Mall! We are a dedicated team of professionals who are passionate about providing high-quality products to our customers. 
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

        </Fragment>
    );
}

export default About


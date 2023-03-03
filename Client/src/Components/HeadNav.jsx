import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const HeadNav = () => {
    return (
        <Navbar variant="light" expand="md" fixed="top" className="navbar-bg nav_mo px-2" style={{ backgroundColor: "#d70018" }}>
            <Navbar.Brand href="/" className='nav_logo'>MoAnJo</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/" className='text-light'>Home</Nav.Link>
                    <Nav.Link href="/about" className='text-light' >About</Nav.Link>
                    <Nav.Link href="/contact" className='text-light'>Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeadNav;

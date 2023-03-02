import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const HeadNav = () => {
    return (
        <Navbar bg="light" variant="light" expand="md" fixed="top" className="navbar-bg nav_mo px-2" style={{ backgroundColor: "#d70018" }}>
            <Navbar.Brand href="/" className='nav_logo'>MoAnJo</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeadNav;

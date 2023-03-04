import React, { Fragment, useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faSignOut, faRegistered } from '@fortawesome/free-solid-svg-icons';
import { setLogout, reseter } from "../Slicer/Auth";
import { createCart, getCart, fetchCart } from "../Slicer/Cart";
import { reseter as resetCategory, getCategories } from "../Slicer/Category";
import { reseter as resetProduct, getProduct } from "../Slicer/Product";
import { getOrder } from "../Slicer/Order";

const HeadNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogout, setIsLogout] = useState(false);
    const userx = localStorage.getItem("user")
        ? localStorage.getItem("user")
        : null;
    const user = JSON.parse(userx);
    const { status } = useSelector((state) => state.auth);


    useEffect(() => {
        if (user !== undefined) {
            dispatch(getCart(user?._id));
            dispatch(getOrder());
        }
        dispatch(getCategories());
        dispatch(createCart());
        dispatch(getProduct());
        dispatch(resetCategory());
        dispatch(resetProduct());
    }, [dispatch]);

    const handleLogout = () => {
        console.log("i was called")
        dispatch(setLogout());
        setIsLogout(true);
    };

    useEffect(() => {
        if (status === "succeeded" && isLogout) {
            localStorage.removeItem("user");
            reseter();
            setIsLogout(false);
            navigate("/");
        }
    }, [status]);

    return (
        <Navbar variant="light" expand="md" fixed="top" className="navbar-bg nav_mo px-2" style={{ backgroundColor: "#d70018" }}>
            <Nav className="container-fluid">
                <Navbar.Brand href="/" className='nav_logo'>MoAnJo</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={"/"} className='text-light'>Home</Nav.Link>
                        <Nav.Link as={Link} to={"/about"} className='text-light' >About</Nav.Link>
                        <Nav.Link as={Link} to={"/contact"} className='text-light'>Contact</Nav.Link>
                        <NavDropdown className="text-light" title="Menu" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/products"}>
                                Product
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/orders"}> Orders</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/categories"}>Category</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to={"/orders"}>
                                Orders
                            </NavDropdown.Item>
                        </NavDropdown>

                        {user ? (

                            <Button variant="danger" onClick={handleLogout} >
                                <FontAwesomeIcon icon={faSignOut} size={'1x'} /> Logout
                            </Button>
                        ) : (
                            <>
                                <Nav.Link as={Link} to={"/login"} className='text-light'> <FontAwesomeIcon icon={faSignIn} size={'1x'} /> Login</Nav.Link>
                                <Nav.Link as={Link} to={"/register"} className='text-light'> <FontAwesomeIcon icon={faRegistered} size={'1x'} /> Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>

            </Nav>
        </Navbar>
    );
};

export default HeadNav;
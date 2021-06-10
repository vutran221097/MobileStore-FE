import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './Navbar.css'
import home from '../../images/navbar/home-navbar.png';
import phone from '../../images/navbar/phone-navbar.png';
import tablet from '../../images/navbar/tablet-navbar.png'
import accessory from '../../images/navbar/headphone-navbar.png';
import cart from '../../images/navbar/shopping-cart.png';
import news from '../../images/navbar/news-navbar.png';
import homeResponsive from '../../images/navbar/home-navbar-responsive.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown
} from "@fortawesome/free-solid-svg-icons";

function NavbarHome() {
    const [show, setShow] = useState(false);
    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }
    return (
        <div className="navbar-homepage">
            <Navbar className="navbar-items" sticky="top" collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand className="navbar-homepage-responsive-home" href="#home"><img src={homeResponsive} alt="HomeResponsive" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className='navbar-link' href="#features">
                            <img src={home} alt="Trang chủ" />
                            <p>Trang chủ</p>
                        </Nav.Link>
                        <NavDropdown className="dropdown-navbar" title={
                            <div className="dropdown-title">
                                <img src={phone} alt="Tablet" />
                                <p className="dropdown-title-phone">Phone <FontAwesomeIcon icon={faCaretDown} /></p>
                            </div>
                        }
                            show={show}
                            onMouseEnter={showDropdown}
                            onMouseLeave={hideDropdown}
                            id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Iphone</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Oppo</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Samsung</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">LG</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Xiaomi</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Sony</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className='navbar-link' href="#pricing"> <img src={tablet} alt="Tablet" />
                            <p>Tablet</p></Nav.Link>
                        <Nav.Link className='navbar-link' href="#pricing"> <img src={accessory} alt="Accessories" />
                            <p>Phụ kiện</p></Nav.Link>
                        <Nav.Link className='navbar-link' href="#news"><img src={news} alt="news" />
                            <p>Tin tức</p></Nav.Link>
                        <Nav.Link className='navbar-link' href="#"><img src={cart} alt="cart" />
                            <p>Giỏ hàng</p></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarHome;

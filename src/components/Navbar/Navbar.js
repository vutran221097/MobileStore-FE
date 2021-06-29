import { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './Navbar.css'
import home from '../../images/navbar/home-navbar.png';
import phone from '../../images/navbar/phone-navbar.png';
import tablet from '../../images/navbar/tablet-navbar.png'
import accessory from '../../images/navbar/headphone-navbar.png';
import cart from '../../images/navbar/shopping-cart.png';
import news from '../../images/navbar/news-navbar.png';
import homeResponsive from '../../images/navbar/home-navbar-responsive.png';
import history from '../../images/navbar/history-navbar.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cartNum from '../../images/navbar/circle.png'


class NavbarHome extends Component {
    render() {
        return (
            <div className="navbar-homepage">
                <Navbar className="navbar-items" sticky="top" collapseOnSelect expand="lg" variant="dark">
                    <Navbar.Brand className="navbar-homepage-responsive-home"><Link to ="/"><img src={homeResponsive} alt="HomeResponsive" /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link className='navbar-link' to="/">
                                <img src={home} alt="Trang chủ" />
                                <p>Trang chủ</p>
                            </Link>
                            <NavDropdown className="dropdown-navbar" title={
                                <div className="dropdown-title">
                                    <img src={phone} alt="Tablet" />
                                    <p className="dropdown-title-phone">Phone <FontAwesomeIcon icon={faCaretDown} /></p>
                                </div>
                            }
                                id="collasible-nav-dropdown">
                                <Link className="dropdown-item" to="/category/apple">Iphone</Link>
                                <Link className="dropdown-item" to="/category/oppo">Oppo</Link>
                                <Link className="dropdown-item" to="/category/samsung">Samsung</Link>
                                <Link className="dropdown-item" to="/category/lg">LG</Link>
                                <Link className="dropdown-item" to="/category/xiaomi">Xiaomi</Link>
                                <Link className="dropdown-item" to="/category/sony">Sony</Link>
                            </NavDropdown>
                            <Link className='navbar-link' to="/category/tablet"> <img src={tablet} alt="Tablet" />
                                <p>Tablet</p></Link>
                            <Link className='navbar-link' to="/category/accessories"> <img src={accessory} alt="Accessories" />
                                <p>Phụ kiện</p></Link>
                            <Link className='navbar-link' to="/news"><img src={news} alt="news" />
                                <p>Tin tức</p></Link>
                            <Link className='navbar-link' to="/history"><img src={history} alt="news" />
                                <p>Lịch sử đơn hàng</p></Link>
                            <Link className='navbar-link cart-number' to="/cart">
                                <img className="cart-icon" src={cart} alt="cart" />
                                {this.props.numberCart > 0 ? (<>
                                    <img className="number-of-cart" src={cartNum} alt="cartNumber" />
                                    <span className="number-of-cart">{this.props.numberCart} </span>
                                </>) : null}
                                <p>Giỏ hàng</p></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        numberCart: state._productCart.numberCart
    }
}



export default connect(mapStateToProps, null)(NavbarHome)

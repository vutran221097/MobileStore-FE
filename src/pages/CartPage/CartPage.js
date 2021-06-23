import React from "react";
import './CartPage.css'
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import Footer from '../../components/Footer/Footer.js';
import { connect } from "react-redux";
import url from '../../setup'
import { Button } from "react-bootstrap";
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../../actions/cart';
import DocumentMeta from 'react-document-meta';

function CartPage({ items, IncreaseQuantity, DecreaseQuantity, DeleteCart }) {
    let ListCart = [];
    let TotalCart = 0;
    Object.keys(items.Carts).forEach(function (item) {
        TotalCart += items.Carts[item].quantity * items.Carts[item].price;
        ListCart.push(items.Carts[item]);
    });
    function TotalPrice(price, totalPrice) {
        return Number(price * totalPrice).toLocaleString('de-DE');
    }

    const meta = { title: "Giỏ hàng" }

    return (
        <div className="cart-page">
            <DocumentMeta {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <div className="cart-page-container mt-4">
                <div className="cart-page-side">
                    news
                </div>
                <div className="cart-page-content">

                    <h2 className="text-center">GIỎ HÀNG</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>Ảnh</th>
                                <th>Màu</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ListCart.map((item, key) => {
                                    return (
                                        <tr className="cart-table" key={key}>
                                            <td><Button className="btn btn-danger" onClick={() => DeleteCart(key)}>X</Button></td>
                                            <td>{item.name}</td>
                                            <td><img src={`${url}/uploads/${item.image}`} alt={item.id} style={{ width: '100px', height: '80px' }} /></td>
                                            <td style={{textTransform:"capitalize"}}>{item.color}</td>
                                            <td>{item.price.toLocaleString("de-DE")} <sup>đ</sup></td>
                                            <td>
                                                <span className="btn btn-danger" style={{ margin: '2px' }} onClick={() => DecreaseQuantity(key)}>-</span>
                                                <span className="btn ">{item.quantity}</span>
                                                <span className="btn btn-success" style={{ margin: '2px' }} onClick={() => IncreaseQuantity(key)}>+</span>
                                            </td>
                                            <td>{TotalPrice(item.price, item.quantity)} <sup>đ</sup></td>
                                        </tr>
                                    )
                                })

                            }
                            <tr>
                                <td colSpan="5">Tổng giá đơn hàng</td>
                                <td>{Number(TotalCart).toLocaleString('de-DE')} <sup>đ</sup></td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </div>

            <Footer />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        items: state._productCart
    }
}

export default connect(mapStateToProps, {
    IncreaseQuantity,
    DecreaseQuantity,
    DeleteCart
})(CartPage)


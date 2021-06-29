import React, { useEffect, useState } from "react";
import './CartPage.css'
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import Footer from '../../components/Footer/Footer.js';
import { connect } from "react-redux";
import url from '../../setup'
import { Button, Modal } from "react-bootstrap";
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../../actions/cart';
import DocumentMeta from 'react-document-meta';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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


    useEffect(() => {
        setCustomerCart(ListCart)
        setCustomerTotalPrice(TotalCart)
        // eslint-disable-next-line
    }, [])

    const meta = { title: "Giỏ hàng" }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [customerName, setCustomerName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [customerAddress, setCustomerAddress] = useState("")
    const [customerCart, setCustomerCart] = useState([])
    const [customerPaymentMethod, setCustomerPaymentMethod] = useState("")
    const [customerTotalPrice, setCustomerTotalPrice] = useState([])

    const onChangeCustomerName = (e) => {
        setCustomerName(e.target.value)
    }

    const onChangeCustomerPhone = (e) => {
        setCustomerPhone(e.target.value)
    }

    const onChangeCustomerAddress = (e) => {
        setCustomerAddress(e.target.value)
    }

    const onChangeCustomerPaymentMethod = (e) => {
        setCustomerPaymentMethod(e.target.value)
    }


    const submitPayment = async (e) => {
        e.preventDefault();

        if (ListCart.length > 0) {
            try {
                const res = await axios.post(`${url}/order`, {
                    name: customerName,
                    phone: customerPhone,
                    address: customerAddress,
                    payMethod: customerPaymentMethod,
                    totalPrice: customerTotalPrice,
                    status: "process",
                    cart: customerCart,
                })

                if (res.status === 200) {
                    toast.success('Cảm ơn bạn đã mua sản phẩm tại cửa hàng chúng tôi!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setShow(false)
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 2500)
                }
            }
            catch (e) {
                console.log(e)
                toast.error('Thanh toán thất bại!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.error('Không có sản phẩm nào trong giỏ hàng!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }


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
                                <th>Bảo hành</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ListCart.length > 0 ? (
                                ListCart.map((item, key) => {
                                    return (
                                        <tr className="cart-table" key={key}>
                                            <td><Button className="btn btn-danger" onClick={() => DeleteCart(key)}>X</Button></td>
                                            <td>{item.name}</td>
                                            <td><img src={`${url}/uploads/${item.image}`} alt={item.id} style={{ width: '100px', height: '80px' }} /></td>
                                            <td style={{ textTransform: "capitalize" }}>{item.color}</td>
                                            <td>{item.guarantee} <sup>th</sup></td>
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

                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center", padding: "2rem 0", textTransform: "uppercase", fontWeight: "bold", fontSize: "1.5rem" }}><FontAwesomeIcon icon={faShoppingCart} /> chưa có sản phẩm nào</td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan="7">Tổng giá đơn hàng</td>
                                <td >{Number(TotalCart).toLocaleString('de-DE')} <sup>đ</sup></td>
                            </tr>
                        </tbody>

                    </table>
                    <div className="payment-button mb-4">
                        <ToastContainer />
                        <Button variant="danger" onClick={handleShow} style={{ width: "100%" }}>
                            Thanh Toán
                        </Button>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thanh toán đơn hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form >
                                <div className="form-group-payment">
                                    <label htmlFor="name">Họ và Tên</label>
                                    <input value={customerName} onChange={onChangeCustomerName} className="form-control" type="text" placeholder="Họ và tên" required />

                                    <label htmlFor="phone">Số điện thoại</label>
                                    <input value={customerPhone} onChange={onChangeCustomerPhone} className="form-control" type="tel" placeholder="Số điện thoại" required />

                                    <label htmlFor="address">Địa chỉ</label>
                                    <input value={customerAddress} onChange={onChangeCustomerAddress} className="form-control" type="text" placeholder="Địa chỉ" required />

                                    <label htmlFor="payment">Phương thức thanh toán</label>
                                    <div id="cart-payment" value={customerPaymentMethod} onChange={onChangeCustomerPaymentMethod}>
                                        <input type="radio" name="status" className="payment-method" value="bank" required /> Chuyển khoản
                                        <input type="radio" name="status" className="payment-method ml-5" value="cod" /> Trực tiếp
                                    </div>

                                </div>

                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button variant="primary" onClick={submitPayment}>
                                Thanh toán
                            </Button>
                        </Modal.Footer>
                    </Modal>

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


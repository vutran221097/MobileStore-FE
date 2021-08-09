import React, { useEffect, useState } from "react";
import axios from 'axios';
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
import getImageContent from "../../components/DemoContent/DemoImageContent";
import { Link } from 'react-router-dom'
import bank from '../../images/Logo_BIDV.png'
import discountIcon from '../../images/discount.png'

function CartPage({ items, IncreaseQuantity, DecreaseQuantity, DeleteCart }) {
    let ListCart = [];
    let TotalCart = 0;

    Object.keys(items.Carts).forEach(function (item) {
        if (items.Carts[item].category !== "accessories") {
            TotalCart += items.Carts[item].quantity * items.Carts[item].price;
        } else {
            TotalCart += items.Carts[item].quantity * items.Carts[item].discount;
        }
        ListCart.push(items.Carts[item])
    });


    function TotalPrice(price, totalPrice) {
        return Number(price * totalPrice).toLocaleString('de-DE');
    }


    const meta = { title: "Giỏ hàng" }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [customerName, setCustomerName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [customerAddress, setCustomerAddress] = useState("")
    const [customerCart, setCustomerCart] = useState(ListCart)
    const [customerPaymentMethod, setCustomerPaymentMethod] = useState("")
    const [customerTotalPrice, setCustomerTotalPrice] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProductData = async () => {
            try {
                const res = await axios.get(`${url}/products`);
                if (res.status === 200) {
                    setProducts(res.data.products.slice(0, 4));
                }
            }
            catch (error) {
                console.log(error);
            };
        }
        getProductData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setCustomerTotalPrice(TotalCart)
        let product = customerCart.map(function (e) { return e.category; })

        if (product.indexOf("apple") === -1 && product.indexOf("samsung") === -1 && product.indexOf("lg") === -1 && product.indexOf("xiaomi") === -1 && product.indexOf("sony") === -1 && product.indexOf("oppo") === -1 && product.indexOf("tablet") === -1) {
            customerCart.map((item) => {
                if (item.category === "accessories") {
                    item.discount = item.price
                }
                return null
            })
        } else {
            customerCart.map((item) => {
                if (item.category === "accessories") {
                    item.discount = item.price * (95 / 100)
                } else {
                    item.discount = item.price
                }
                return null
            })
        }
    }, [customerCart, TotalCart])

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

    const errorMess = (str) => {
        toast.error(str, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const successMess = (str) => {
        toast.success(str, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const deleteItemCart = (id) => {
        setCustomerCart(customerCart.filter(item => item.id !== id))
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
                    status: 1,
                    cart: customerCart,
                })

                if (res.status === 200) {
                    successMess('Cảm ơn bạn đã mua sản phẩm tại cửa hàng chúng tôi!')
                    setShow(false)
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 2500)
                }
            }
            catch (e) {
                console.log(e)
                errorMess('Thanh toán thất bại!')
            }
        } else {
            errorMess('Không có sản phẩm nào trong giỏ hàng!')
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
                                customerCart.map((item, key) => {
                                    return (
                                        <tr className="cart-table" key={key}>
                                            <td style={{width:"5%"}}><Button className="btn btn-danger" onClick={() => { DeleteCart(key); deleteItemCart(item.id) }}>X</Button></td>
                                            <td style={{width:"20%"}}><Link style={{ cursor: "pointer", color: "black", textDecoration: "none" }} to={`/product/${item.id}`} target="_blank" rel="noopener noreferrer"> {item.name}</Link></td>
                                            <td style={{width:"10%"}}><Link style={{ cursor: "pointer", color: "black", textDecoration: "none" }} to={`/product/${item.id}`} target="_blank" rel="noopener noreferrer"><img src={`${url}/uploads/${item.image}`} alt={item.id} style={{ width: '100px', height: '80px' }} /></Link></td>
                                            <td style={{width:"10%",textTransform: "capitalize" }}>{item.color}</td>
                                            <td style={{width:"10%"}}>{item.guarantee} <sup>th</sup></td>
                                            {item.category === "accessories" ? (item.discount !== item.price ? (<td style={{width:"15%"}}> <p style={{ textDecoration: "line-through" }}>{item.price.toLocaleString("de-DE")}đ</p> <p> {item.discount.toLocaleString("de-DE")} <sup>đ</sup> <img style={{ width: "2rem", height: "2rem" }} src={discountIcon} alt="discount 5%" /></p>  </td>) : (<td style={{width:"15%"}}> <p>{item.price.toLocaleString("de-DE")}đ</p></td>)) : (<td>{item.discount.toLocaleString("de-DE")} <sup>đ</sup> </td>)}
                                            <td style={{width:"15%"}}>
                                                <span className="btn btn-danger" style={{ margin: '2px' }} onClick={() => DecreaseQuantity(key)}>-</span>
                                                <span className="btn ">{item.quantity}</span>
                                                <span className="btn btn-success" style={{ margin: '2px' }} onClick={() => IncreaseQuantity(key)}>+</span>
                                            </td>
                                            <td style={{width:"15%"}}>{TotalPrice(item.discount, item.quantity)} <sup>đ</sup></td>
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
                            <form onSubmit={submitPayment}>
                                <div className="form-group-payment">
                                    <label htmlFor="name">Họ và Tên</label>
                                    <input value={customerName} onChange={onChangeCustomerName} className="form-control" type="text" placeholder="Họ và tên" required />

                                    <label htmlFor="phone">Số điện thoại</label>
                                    <input pattern="[\d]{9,11}$" title="Số điện thoại từ 9 -11 số" minLength="9" maxLength="11" value={customerPhone} onChange={onChangeCustomerPhone} className="form-control" type="tel" placeholder="Số điện thoại" required />

                                    <label htmlFor="address">Địa chỉ giao hàng</label>
                                    <input value={customerAddress} onChange={onChangeCustomerAddress} className="form-control" type="text" placeholder="Địa chỉ" required />

                                    <label htmlFor="payment">Phương thức thanh toán</label>
                                    <div id="cart-payment" value={customerPaymentMethod} onChange={onChangeCustomerPaymentMethod}>
                                        <input type="radio" name="status" className="payment-method" value="bank" required /> Chuyển khoản
                                        <input type="radio" name="status" className="payment-method" value="cod" style={{marginLeft:"30%"}}/> Trực tiếp (COD)
                                    </div>

                                    <div className="d-flex justify-content-between my-3" style={{fontWeight:"bold"}}>
                                        <img src={bank} alt="bank" style={{ width: "50%" }} />
                                        <div>
                                        <p>Chủ tài khoản: Trần Xuân Vũ </p>
                                        <p>Số tài khoản: 1240000642529</p>
                                        <p>BIDV PGD Thanh Xuân Bắc</p>
                                        </div>                                  
                                    </div>
                                    

                                    <Button className="my-2" style={{ width: "100%" }} variant="primary" type="submit">
                                        Thanh toán
                                    </Button>

                                </div>

                            </form>
                        </Modal.Body>
                    </Modal>

                </div>
                <div className="cart-page-side">
                    <div className="same-products">
                        <div className="same-products-header-title"><p>Sản phẩm mới</p></div>
                        <div className="same-product-items">
                            {products.map((item) => {
                                let imageBody = JSON.parse(item.description)
                                let [contentImage] = getImageContent(imageBody.body);
                                let image = [...contentImage].splice(0, 1).map((item) => item.src)
                                return (
                                    <Link to={`/product/${item._id}`} key={item._id} >
                                        <div className="same-products-item" >
                                            <img src={image[0]} alt={item._id} style={{ width: "100%" }} />
                                            <p>{item.name}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
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


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import url from '../../setup';
import axios from 'axios';
import './PhoneHistoryOrder.css'
import DocumentMeta from 'react-document-meta';
import discountIcon from '../../images/discount.png'

function PhoneHistoryOrder() {
    const [phoneNumber,] = useState(sessionStorage.getItem("phoneNumber"))
    const [orderHistory, setOrderHistory] = useState([])
    useEffect(() => {
        const getOder = async () => {
            try {
                const res = await axios.get(`${url}/order/phone/${phoneNumber}`);
                if (res.status === 200) {
                    setOrderHistory(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getOder()
        // eslint-disable-next-line
    }, [])

    const Logout = () => {
        sessionStorage.removeItem('phoneNumber')
    }

    const meta = {
        title: "Chi tiết giao dịch"
    }

    const getDate = (item) => {
        let MyDate = new Date(item);
        let MyDateString;

        MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
            + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/'
            + MyDate.getFullYear();

        return MyDateString
    }

    function TotalPrice(price, totalPrice) {
        return Number(price * totalPrice).toLocaleString('de-DE');
    }

    return (
        <div className="order-history-page">
            <DocumentMeta {...meta} />
            <div>
                <h1 style={{ textAlign: "center", margin: "0 0 2rem 0" }}>Lịch sử mua hàng {phoneNumber}
                    <span>
                        <Link to="/history/order" className="order-history-page-logout" onClick={Logout}>
                            [Thoát]
                        </Link>
                    </span>
                </h1>
            </div>


            <h2 style={{ margin: "0 0 2rem 0" }}>Tổng đơn hàng {orderHistory.length}</h2>
            <hr />
            <div>
                {orderHistory.length === 0 ? (<h1 className="text-center">Chưa có giao dịch nào</h1>) : null}

                {orderHistory.map((item, index) => {
                    return (
                        <div key={item._id}>
                            <div className="order-history-information">
                                <p>- Mã đơn hàng: <span>{item._id}</span></p>
                                <p>- Tên khách hàng: <span style={{ textTransform: "capitalize" }}>{item.name}</span></p>
                                <p>- Ngày mua hàng: <span>{getDate(item.createdAt)}</span></p>
                                <p>- Ngày nhận hàng: <span>{getDate(item.updatedAt)}</span></p>
                                <p>- Phương thức thanh toán: <span>{item.payMethod === "bank" ? "Chuyển khoản" : "Thanh toán trực tiếp"}</span></p>
                                <p>- Tình trạng đơn hàng: {item.status === 1 ? (<span style={{ color: "green", fontWeight: "bold" }}>Đang xử lý</span>) : (<span style={{ color: "red", fontWeight: "bold" }}>Đã giao hàng</span>)}</p>
                            </div>

                            <table className="order-history-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "30%" }}>Tên sản phẩm</th>
                                        <th>Ảnh</th>
                                        <th>Màu</th>
                                        <th>Bảo hành</th>                                      
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Tổng giá</th>
                                    </tr>
                                </thead>


                                {item.cart.map((item) => {
                                    return (
                                        <tbody key={item.id}>
                                            <tr>
                                                <td style={{ width: "30%" }}>{item.name}</td>
                                                <td><img src={`${url}/uploads/${item.image}`} alt={item.id} style={{ width: "10rem", height: "auto" }} /></td>
                                                <td>{item.color}</td>
                                                <td>{item.guarantee} <sup>th</sup></td>                                          
                                                {item.category === "accessories" ? (item.discount !== item.price ? (<td> <p style={{ textDecoration: "line-through" }}>{item.price.toLocaleString("de-DE")}đ</p> <p> {item.discount.toLocaleString("de-DE")} <sup>đ</sup> <img style={{ width: "2rem", height: "2rem" }} src={discountIcon} alt="discount 5%" /></p>  </td>) : (<td> <p>{item.price.toLocaleString("de-DE")}đ</p></td>)) : (<td>{item.discount.toLocaleString("de-DE")} <sup>đ</sup> </td>)}
                                                <td>{item.quantity}</td>
                                                <td>{TotalPrice(item.discount, item.quantity)} <sup>đ</sup></td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                                <tbody>
                                    <tr>
                                        <td colSpan="5" style={{ fontWeight: "bold" }}>Tổng giá đơn hàng</td>
                                        <td style={{ fontWeight: "bold", color: "red" }}>{item.totalPrice.toLocaleString('de-DE')} <sup>đ</sup></td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PhoneHistoryOrder
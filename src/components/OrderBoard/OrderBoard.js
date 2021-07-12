import React, { useState, useEffect } from 'react'
import url from '../../setup'
import axios from 'axios'
import authHeader from '../../services/auth-header'
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "../Pagination/Pagination";
import './OrderBoard.css'
import { Button } from 'react-bootstrap'
import discountIcon from '../../images/discount.png'

function OrderBoard({ match }) {
    const pageNumber = match.params.pageNumber || 1
    const [order, setOrder] = useState([])
    const [allOrder, setAllOrder] = useState([])
    const [page, setPage] = useState(pageNumber)
    const [pages, setPages] = useState(1)
    const [, setLoading] = useState(false)
    const [sortByDate, setSortByDate] = useState(-1)
    const [sortByStatus, setSortByStatus] = useState("")
    const [sortByPhone, setSortByPhone] = useState("")
    const [totalPhoneOrder, setTotalPhoneOrder] = useState([])

    function TotalPrice(price, totalPrice) {
        return Number(price * totalPrice).toLocaleString('de-DE');
    }

    useEffect(() => {
        const getOrderData = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${url}/order?page=${page}&sortByPhone=${sortByPhone}&sortByDate=${sortByDate}&sortByStatus=${sortByStatus}`, { headers: authHeader() });
                if (res.status === 200) {
                    setOrder(res.data.order);
                    setPages(res.data.pages)
                    setTotalPhoneOrder(res.data.totalPhone)
                    setLoading(false)
                    setAllOrder(res.data.allOrder)
                }
            }
            catch (error) {
                console.log(error);
            };
        }
        getOrderData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, sortByDate, sortByStatus, sortByPhone])

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

    const onDone = async (id) => {
        window.location.reload(false);
        try {
            const res = await axios.put(`${url}/order/${id}`, {
                status: 0
            }, { headers: authHeader() })

            if (res.status === 200) {
                setOrder(order.map(item => item._id === id));
                successMess("Cập nhật đơn hàng thành công!")
            }
        }
        catch (e) {
            console.log(e)
            errorMess("Cập nhật đơn hàng thất bại!")
        }
    }

    const onProcess = async (id) => {
        window.location.reload(false);
        try {
            const res = await axios.put(`${url}/order/${id}`, {
                status: 1
            }
                , { headers: authHeader() })

            if (res.status === 200) {
                setOrder(order.map(i => (i._id === id)));
                successMess("Cập nhật đơn hàng thành công!")
            }
        }
        catch (e) {
            console.log(e)
            errorMess("Cập nhật đơn hàng thất bại!")
        }
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

    const onDeleteOrder = async (id) => {
        try {
            const res = await axios.delete(`${url}/order/${id}`, { headers: authHeader() })
            if (res.status === 200) {
                setOrder(order.filter(item => item._id !== id))
                successMess("Xóa đơn hàng thành công!")
            }
        } catch (e) {
            console.log(e);
            errorMess("Xóa đơn hàng thất bại!")
        }
    }

    const getDate = (item) => {
        let MyDate = new Date(item);
        let MyDateString;

        MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
            + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/'
            + MyDate.getFullYear();

        return MyDateString
    }


    const totalProcess = allOrder.filter((item) => {
        return item.status === 1
    })

    const totalDone = allOrder.filter((item) => {
        return item.status === 0
    })

    const totalPhoneProcess = totalPhoneOrder.filter((item) => {
        return item.status === 1
    })

    const totalPhoneDone = totalPhoneOrder.filter((item) => {
        return item.status === 0
    })

    const onChangeSortByDate = (e) => {
        const sortByDate = [...order]
        setSortByStatus("")
        setSortByDate(parseInt(e.target.value))
        setOrder(sortByDate)
    }

    const onChangeSortByStatus = (e) => {
        const sortByStatus = [...order]
        setSortByDate("")
        setSortByStatus(parseInt(e.target.value))
        setOrder(sortByStatus)
    }

    const onChangeSortByPhone = (e) => {
        setSortByPhone(e.target.value)
    }

    return (
        <div className="orderboard-page">
            <ToastContainer />
            <h2 className="news-board-header-title">ORDER BOARD</h2>
            <div>
                <hr style={{ borderTop: "5px solid black" }} />
                <div className="d-flex justify-content-between">
                    <h2>Tổng đơn hàng {allOrder.length}</h2>
                    <h2 style={{ color: "green" }}>Đơn hàng đang xử lý: {totalProcess.length}</h2>
                    <h2 style={{ color: "red" }}>Đơn hàng đã hoàn thành: {totalDone.length} </h2>
                </div>
                <hr style={{ borderTop: "5px solid black" }} />

                <div className="product-board-filter">
                    <div className="filter-container px-2">
                        <input type="tel" value={sortByPhone} onChange={onChangeSortByPhone} placeholder="Nhập số điện thoại" />
                    </div>
                    <div className="filter-container px-2">
                        <select id="sortByPrice" className="filter-selected" onChange={onChangeSortByDate}>
                            <option hidden>Sắp xếp đơn hàng theo ngày mua</option>
                            <option value="-1">Gần nhất</option>
                            <option value="1">Cũ</option>
                        </select>
                    </div>
                    <div className="filter-container">
                        <select id="sortByDate" className="filter-selected" onChange={onChangeSortByStatus}>
                            <option hidden>Sắp xếp đơn hàng theo tình trạng</option>
                            <option value="-1">Đang xử lý</option>
                            <option value="1" >Đã giao hàng</option>
                        </select>
                    </div>
                </div>
                {sortByPhone ? (
                    <>
                        <div className="d-flex justify-content-between">
                            <h5>Tổng đơn hàng {sortByPhone}: {totalPhoneOrder.length}</h5>
                            <h5 style={{ color: "green" }}>Đơn hàng đang xử lý: {totalPhoneProcess.length}</h5>
                            <h5 style={{ color: "red" }}>Đơn hàng đã hoàn thành: {totalPhoneDone.length} </h5>
                        </div>
                        <hr style={{ borderTop: "2px solid black" }} />
                    </>
                ) : null}



                <div>
                    {order.map((item) => {
                        return (
                            <div key={item._id}>
                                <div className={item.status === 0 ? "order-done" : "order-process"}>
                                    <div className="d-flex justify-content-between">
                                        <div className="order-board-information d-flex flex-column justify-content-around">
                                            <h3>Thông tin khách hàng</h3>
                                            <p>- Tên khách hàng: <span style={{ textTransform: "capitalize" }}>{item.name}</span></p>
                                            <p>- Số điện thoại: <span>{"0" + item.phone}</span></p>
                                            <p>- Phương thức thanh toán: <span>{item.payMethod === "bank" ? "Chuyển khoản" : "Thanh toán trực tiếp"}</span></p>
                                            <p>- Địa chỉ giao hàng: <span>{item.address}</span></p>
                                        </div>

                                        <div className="order-board-information d-flex flex-column justify-content-around">
                                            <h3>Tình trạng đơn hàng</h3>
                                            <p>- Mã đơn hàng: {item._id}</p>
                                            <p>- Ngày mua hàng: <span>{getDate(item.createdAt)}</span></p>
                                            <p>- Ngày xử lý đơn hàng: <span>{getDate(item.updatedAt)}</span></p>
                                            <p>- Tình trạng đơn hàng: {item.status === 1 ? (<span style={{ color: "green", fontWeight: "bold" }}>Đang xử lý</span>) : (<span style={{ color: "red", fontWeight: "bold" }}>Đã giao hàng</span>)}</p>
                                        </div>

                                        <div className="d-flex flex-column justify-content-around">
                                            <h3>Phương thức xử lý</h3>
                                            <Button variant="success" onClick={() => { if (item.status !== 1) { onProcess(item._id) } else successMess("Sản phẩm đang xử lý") }}>Đang xử lý</Button>
                                            <Button variant="danger" onClick={() => { if (item.status !== 0) { onDone(item._id) } else errorMess("Sản phẩm đã giao hàng") }}>Đã giao hàng</Button>
                                            <Button variant="secondary" onClick={() => { if (window.confirm("Bạn muốn xóa đơn hàng này chứ ?")) onDeleteOrder(item._id) }}>Xóa đơn hàng</Button>
                                        </div>
                                    </div>
                                    <table className="order-board-table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "25%" }}>Tên sản phẩm</th>
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
                                                <tbody key={item.id} className="border-bottom   ">
                                                    <tr>
                                                        <td style={{ width: "25%" }}>{item.name}</td>
                                                        <td className="py-3"><img src={`${url}/uploads/${item.image}`} alt={item.id} style={{ width: "10rem", height: "8rem" }} /></td>
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

                                </div>

                                <hr style={{ borderTop: "5px solid black" }} />
                            </div>
                        )
                    })}


                </div>
                <div className="d-flex flex-column align-items-center">
                    <div>Page {page}</div>
                    <Pagination page={page} pages={pages} changePage={setPage} />
                </div>

            </div>
        </div >
    )
}

export default OrderBoard
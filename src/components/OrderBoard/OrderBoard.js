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
                successMess("C???p nh???t ????n h??ng th??nh c??ng!")
            }
        }
        catch (e) {
            console.log(e)
            errorMess("C???p nh???t ????n h??ng th???t b???i!")
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
                successMess("C???p nh???t ????n h??ng th??nh c??ng!")
            }
        }
        catch (e) {
            console.log(e)
            errorMess("C???p nh???t ????n h??ng th???t b???i!")
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
                successMess("X??a ????n h??ng th??nh c??ng!")
            }
        } catch (e) {
            console.log(e);
            errorMess("X??a ????n h??ng th???t b???i!")
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
                    <h2>T???ng ????n h??ng {allOrder.length}</h2>
                    <h2 style={{ color: "green" }}>????n h??ng ??ang x??? l??: {totalProcess.length}</h2>
                    <h2 style={{ color: "red" }}>????n h??ng ???? ho??n th??nh: {totalDone.length} </h2>
                </div>
                <hr style={{ borderTop: "5px solid black" }} />

                <div className="product-board-filter">
                    <div className="filter-container px-2">
                        <input type="tel" value={sortByPhone} onChange={onChangeSortByPhone} placeholder="Nh???p s??? ??i???n tho???i" />
                    </div>
                    <div className="filter-container px-2">
                        <select id="sortByPrice" className="filter-selected" onChange={onChangeSortByDate}>
                            <option hidden>S???p x???p ????n h??ng theo ng??y mua</option>
                            <option value="-1">G???n nh???t</option>
                            <option value="1">C??</option>
                        </select>
                    </div>
                    <div className="filter-container">
                        <select id="sortByDate" className="filter-selected" onChange={onChangeSortByStatus}>
                            <option hidden>S???p x???p ????n h??ng theo t??nh tr???ng</option>
                            <option value="-1">??ang x??? l??</option>
                            <option value="1" >???? giao h??ng</option>
                        </select>
                    </div>
                </div>
                {sortByPhone ? (
                    <>
                        <div className="d-flex justify-content-between">
                            <h5>T???ng ????n h??ng {sortByPhone}: {totalPhoneOrder.length}</h5>
                            <h5 style={{ color: "green" }}>????n h??ng ??ang x??? l??: {totalPhoneProcess.length}</h5>
                            <h5 style={{ color: "red" }}>????n h??ng ???? ho??n th??nh: {totalPhoneDone.length} </h5>
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
                                            <h3>Th??ng tin kh??ch h??ng</h3>
                                            <p>- T??n kh??ch h??ng: <span style={{ textTransform: "capitalize" }}>{item.name}</span></p>
                                            <p>- S??? ??i???n tho???i: <span>{"0" + item.phone}</span></p>
                                            <p>- Ph????ng th???c thanh to??n: <span>{item.payMethod === "bank" ? "Chuy???n kho???n" : "Thanh to??n tr???c ti???p"}</span></p>
                                            <p>- ?????a ch??? giao h??ng: <span>{item.address}</span></p>
                                        </div>

                                        <div className="order-board-information d-flex flex-column justify-content-around">
                                            <h3>T??nh tr???ng ????n h??ng</h3>
                                            <p>- M?? ????n h??ng: {item._id}</p>
                                            <p>- Ng??y mua h??ng: <span>{getDate(item.createdAt)}</span></p>
                                            <p>- Ng??y x??? l?? ????n h??ng: <span>{getDate(item.updatedAt)}</span></p>
                                            <p>- T??nh tr???ng ????n h??ng: {item.status === 1 ? (<span style={{ color: "green", fontWeight: "bold" }}>??ang x??? l??</span>) : (<span style={{ color: "red", fontWeight: "bold" }}>???? giao h??ng</span>)}</p>
                                        </div>

                                        <div className="d-flex flex-column justify-content-around">
                                            <h3>Ph????ng th???c x??? l??</h3>
                                            <Button variant="success" onClick={() => { if (item.status !== 1) { onProcess(item._id) } else successMess("S???n ph???m ??ang x??? l??") }}>??ang x??? l??</Button>
                                            <Button variant="danger" onClick={() => { if (item.status !== 0) { onDone(item._id) } else errorMess("S???n ph???m ???? giao h??ng") }}>???? giao h??ng</Button>
                                            <Button variant="secondary" onClick={() => { if (window.confirm("B???n mu???n x??a ????n h??ng n??y ch??? ?")) onDeleteOrder(item._id) }}>X??a ????n h??ng</Button>
                                        </div>
                                    </div>
                                    <table className="order-board-table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "25%" }}>T??n s???n ph???m</th>
                                                <th>???nh</th>
                                                <th>M??u</th>
                                                <th>B???o h??nh</th>
                                                <th>Gi??</th>
                                                <th>S??? l?????ng</th>
                                                <th>T???ng gi??</th>
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
                                                        {item.category === "accessories" ? (item.discount !== item.price ? (<td> <p style={{ textDecoration: "line-through" }}>{item.price.toLocaleString("de-DE")}??</p> <p> {item.discount.toLocaleString("de-DE")} <sup>??</sup> <img style={{ width: "2rem", height: "2rem" }} src={discountIcon} alt="discount 5%" /></p>  </td>) : (<td> <p>{item.price.toLocaleString("de-DE")}??</p></td>)) : (<td>{item.discount.toLocaleString("de-DE")} <sup>??</sup> </td>)}
                                                        <td>{item.quantity}</td>
                                                        <td>{TotalPrice(item.discount, item.quantity)} <sup>??</sup></td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                        <tbody>
                                            <tr>
                                                <td colSpan="5" style={{ fontWeight: "bold" }}>T???ng gi?? ????n h??ng</td>
                                                <td style={{ fontWeight: "bold", color: "red" }}>{item.totalPrice.toLocaleString('de-DE')} <sup>??</sup></td>
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
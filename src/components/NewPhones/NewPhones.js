import React, { useState, useEffect } from 'react'
import './NewPhones.css'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import getBodyContent from '../DemoContent/DemoBodyContent';
import url from '../../setup'
import { Link } from 'react-router-dom'


function NewPhones() {
    const [phoneList, setPhoneList] = useState([])
    const [loading, setLoading] = useState(true)
    const getPhoneList = async () => {
        try {
            const res = await axios.get(`${url}/products`);
            if (res.status === 200) {
                let phones = res.data.allProduct
                let phone = phones.filter((item) => {
                    return (item.category !== "accessories" & item.category !== "tablet")
                }).slice(0, 8)
                setPhoneList(phone);
                setLoading(false)
            }
        } catch (error) {
            console.error(error);
            setLoading(false)
            setPhoneList([])
        }
    }

    useEffect(() => {
        getPhoneList();
    }, [])


    return (
        <div className='new-phones'>
            <div className="new-phones-header-title"><p>Điện thoại mới</p></div>
            {loading && <h1 className="text-center">Loading . . . </h1>}
            {!phoneList.length && !loading ? (<h1 className="text-center">Không có sản phẩm.</h1>) : (<div className="new-phones-content">
                {phoneList.map((item) => {
                    return (
                        <div className="new-phones-items" key={item._id}>
                            <Link to={`/product/${item._id}`} style={{ color: "black", textDecoration: "none" }}>
                                <Card className="new-phones-card">
                                    <Card.Img className="new-phones-image" variant="top" src={`${url}/uploads/${item.image}`} />
                                    <Card.Body>
                                        <p className="new-phones-title">{item.name}</p>
                                        <p className="new-phones-description">
                                            {getBodyContent(item.description).slice(0, 50) + "..."}
                                        </p>
                                        <div className="new-phones-card-footer">
                                            <p className="new-phones-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>
                                            <Button variant="danger">
                                                Mua ngay
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                    )
                })}
            </div>)}

        </div>
    )
}

export default NewPhones
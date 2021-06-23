import React, { useState, useEffect } from 'react'
import './NewPhones.css'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import StringToHtml from '../StringToHtml/StringToHtml';
import url from '../../setup'
import { Link } from 'react-router-dom'


function NewPhones() {
    const [phoneList, setPhoneList] = useState([])
    const getPhoneList = async () => {
        try {
            const res = await axios.get(`${url}/products/allPhone/`);
            if (res.status === 200) {
                const phones = res.data
                let phone = phones.filter((item)=>{
                    return (item.category!=="accessories" & item.category !=="tablet")
                }).slice(0,8)
                setPhoneList(phone);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPhoneList();
    }, [])


    return (
        <div className='new-phones'>
            <div className="new-phones-header-title"><p>Điện thoại mới</p></div>
            <div className="new-phones-content">
                {phoneList.map((item) => {
                    return (
                        <div className="new-phones-items" key={item._id}>
                            <Card className="new-phones-card">
                                <Card.Img className="new-phones-image" variant="top" src={`${url}/uploads/${item.image}`} />
                                <Card.Body>
                                    <p className="new-phones-title">{item.name}</p>
                                    <p className="new-phones-description">
                                        {StringToHtml(item.description).slice(0,50)+"..."}
                                    </p>
                                    <div className="new-phones-card-footer">
                                        <p className="new-phones-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>
                                        <Link to={`/product/${item._id}`}>
                                            <Button variant="danger">
                                                Mua ngay
                                            </Button>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })}


            </div>
        </div>
    )
}

export default NewPhones
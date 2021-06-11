import React, { useState, useEffect } from 'react'
import './NewProducts.css'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import url from '../../setup'

function FeaturedProducts() {
    const [phoneList, setPhoneList] = useState([])
    const getPhoneList = async () => {
        try {
            const res = await axios.get(`${url}/phones`);
            if (res.status === 200) {
                console.log(res.data)
                setPhoneList(res.data.reverse().slice(0, 8));
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getPhoneList();
    }, [])

    return (
        <div className='new-products'>
            <div className="new-products-header-title"><p>Sản phẩm mới</p></div>
            <div className="new-products-content">
                {phoneList.map((item) => {
                    return (
                        <div className="new-products-items" key={item._id}>
                            <Card className="new-products-card">
                                <Card.Img className="new-products-image" variant="top" src={`${url}/uploads/${item.image}`} />
                                <Card.Body>
                                    <p className="new-products-title">{item.name}</p>
                                    <p className="new-products-description">
                                        {item.description.substring(0, 50)}
                                    </p>
                                    <div className="new-products-card-footer">
                                            <p className="new-products-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>
                                            <Button variant="danger">Mua ngay</Button>
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

export default FeaturedProducts
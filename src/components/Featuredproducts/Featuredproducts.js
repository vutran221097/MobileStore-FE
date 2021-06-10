import React, { useState, useEffect } from 'react'
import './FeaturedProducts.css'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import url from '../../setup'

function FeaturedProducts() {
    const [phoneList, setPhoneList] = useState([])
    const getPhoneList = async () => {
        try {
            const res = await axios.get(`${url}/phones`);
            setPhoneList(res.data.slice(0, 4));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPhoneList();
    }, [])

    console.log(phoneList);

    return (
        <div className='feature-products'>
            <div className="feature-products-header-title"><p>Sản phẩm mới</p></div>
            <div className="feature-products-container">

                <div className="feature-products-content">
                    {phoneList.map((item) => {
                        return (
                            <div className="feature-product-items" key={item._id}>
                                <Card className="feature-product-card">
                                    <Card.Img className="feature-product-image" variant="top" src={`${url}/uploads/${item.image}`} />
                                    <Card.Body>
                                        <p className="feature-product-title">{item.name}</p>
                                        <p className="feature-product-description">
                                            {item.description.substring(0, 50)}
                                        </p>
                                        <Button variant="primary">Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default FeaturedProducts
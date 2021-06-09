import React, { useState, useEffect } from 'react'
import './FeaturedProducts.css'
import {Card,Button} from 'react-bootstrap'
import axios from 'axios';
import url from '../../setup'

function FeaturedProducts() {
    const [phoneList, setPhoneList] = useState([])
    const getPhoneList = async () => {
        try {
            const res = await axios.get(`${url}/phones`);
            setPhoneList(res.data);
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
            {phoneList.map((item) => {
                return (
                    <div className="feature-product-items" key={item._id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={`${url}/uploads/${item.image}`} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.description.substring(0,100)}
                                </Card.Text>
                                <Button variant="primary">Chi tiết</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default FeaturedProducts
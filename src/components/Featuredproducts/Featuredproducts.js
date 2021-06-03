import React, { useState, useEffect } from 'react'
import './FeaturedProducts.css'
import axios from 'axios';

function FeaturedProducts() {
    const [phoneList, setPhoneList] = useState([])
    const getPhoneList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/phones');
            setPhoneList(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPhoneList();
    },[])

    console.log(phoneList);

    return (
        <div className='feature-products'>
            {phoneList.map((item, index) => {
                return (
                    <div className="feature-product-items" key={index}>
                        <p className="product-name">{item.name}</p>
                        <p className="product-description">{item.description}</p>
                        <p className="product-price">{item.price}</p>
                        <p className="product-color">{item.color}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default FeaturedProducts
import React, { useState, useEffect } from 'react'
import './NewAccessories.css'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import url from '../../setup'
import { Link } from 'react-router-dom'
import StringToHtml from "../StringToHtml/StringToHtml"


function NewAccessories() {
    const [accessoryList, setAccessoryList] = useState([])
    const getAccessoryList = async () => {
        try {
            const res = await axios.get(`${url}/products/category/accessories`);
            if (res.status === 200) {
                const accessories = res.data.slice(0,4)
                setAccessoryList(accessories);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAccessoryList();
    }, [])


    return (
        <div className='new-accessories'>
            <div className="new-accessories-header-title"><p>Phụ kiện mới</p></div>
            <div className="new-accessories-content">
                {accessoryList.map((item) => {
                    return (
                        <div className="new-accessories-items" key={item._id}>
                            <Card className="new-accessories-card">
                                <Card.Img className="new-accessories-image" variant="top" src={`${url}/uploads/${item.image}`} />
                                <Card.Body>
                                    <p className="new-accessories-title">{item.name}</p>
                                    <p className="new-accessories-description">
                                        {StringToHtml(item.description).slice(0,50)+"..."}
                                    </p>
                                    <div className="new-accessories-card-footer">
                                        <p className="new-accessories-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>
                                        <Link to={`/sanpham/${item._id}`}>
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

export default NewAccessories
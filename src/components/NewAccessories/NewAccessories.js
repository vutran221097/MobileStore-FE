import React, { useState, useEffect } from 'react'
import './NewAccessories.css'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import url from '../../setup'
import { Link } from 'react-router-dom'
import StringToHtml from "../DemoContent/DemoBodyContent"


function NewAccessories() {
    const [accessoryList, setAccessoryList] = useState([])
    const [loading, setLoading] = useState(true)
    const getAccessoryList = async () => {
        try {
            const res = await axios.get(`${url}/products?category=accessories&sortByDate=-1`);
            if (res.status === 200) {
                const accessories = res.data.products.slice(0, 4)
                setAccessoryList(accessories);
                setLoading(false)
            }
        } catch (error) {
            console.error(error);
            setLoading(false)
            setAccessoryList([])
        }
    }

    useEffect(() => {
        getAccessoryList();
    }, [])


    return (
        <div className='new-accessories'>
            <div className="new-accessories-header-title"><p>Phụ kiện mới</p></div>
            {loading && <h1 className="text-center">Loading . . . </h1>}
            {!accessoryList.length && !loading ? (<h1 className="text-center">Không có sản phẩm.</h1>) : (<div className="new-accessories-content">
                {accessoryList.map((item) => {
                    return (
                        <div className="new-accessories-items" key={item._id}>
                            <Link to={`/product/${item._id}`} style={{ color: "black", textDecoration: "none" }}>
                                <Card className="new-accessories-card">
                                    <Card.Img className="new-accessories-image" variant="top" src={`${url}/uploads/${item.image}`} />
                                    <Card.Body>
                                        <p className="new-accessories-title">{item.name}</p>
                                        <p className="new-accessories-description">
                                            {StringToHtml(item.description).slice(0, 50) + "..."}
                                        </p>
                                        <div className="new-accessories-card-footer">
                                            <p className="new-accessories-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>
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

export default NewAccessories
import React, { useState, useEffect } from 'react'
import './NewTablets.css'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import getBodyContent from '../DemoContent/DemoBodyContent';
import url from '../../setup'
import { Link } from 'react-router-dom'


function NewTablets() {
    const [tabletList, setTabletList] = useState([])
    const getTabletList = async () => {
        try {
            const res = await axios.get(`${url}/products/category/tablet`);
            if (res.status === 200) {
                const tablets = res.data.slice(0, 4)
                setTabletList(tablets);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTabletList();
    }, [])


    return (
        <div className='new-tablets'>
            <div className="new-tablets-header-title"><p>Máy tính bảng mới</p></div>
            <div className="new-tablets-content">
                {tabletList.map((item) => {
                    return (
                        <div className="new-tablets-items" key={item._id}>
                            <Card className="new-tablets-card">
                                <Card.Img className="new-tablets-image" variant="top" src={`${url}/uploads/${item.image}`} />
                                <Card.Body>
                                    <p className="new-tablets-title">{item.name}</p>
                                    <p className="new-tablets-description">
                                        {getBodyContent(item.description).slice(0, 50) + "..."}
                                    </p>
                                    <div className="new-tablets-card-footer">
                                        <p className="new-tablets-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>
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

export default NewTablets
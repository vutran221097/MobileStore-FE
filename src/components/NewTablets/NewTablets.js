import React, { useState, useEffect } from 'react'
import './NewTablets.css'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import getBodyContent from '../DemoContent/DemoBodyContent';
import url from '../../setup'
import { Link } from 'react-router-dom'


function NewTablets() {
    const [tabletList, setTabletList] = useState([])
    const [loading, setLoading] = useState(true)
    const getTabletList = async () => {
        try {
            const res = await axios.get(`${url}/products?category=tablet&sortByDate=-1`);
            if (res.status === 200) {
                const tablets = res.data.products.slice(0, 4)
                setTabletList(tablets);
                setLoading(false)
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
            {
                loading === true ? (<h1 className="text-center">Loading . . . </h1>) : (<div className="new-tablets-content">
                    {tabletList.map((item) => {
                        return (
                            <div className="new-tablets-items" key={item._id}>
                                <Link to={`/product/${item._id}`} style={{ color: "black", textDecoration: "none" }}>
                                    <Card className="new-tablets-card">
                                        <Card.Img className="new-tablets-image" variant="top" src={`${url}/uploads/${item.image}`} />
                                        <Card.Body>
                                            <p className="new-tablets-title">{item.name}</p>
                                            <p className="new-tablets-description">
                                                {getBodyContent(item.description).slice(0, 50) + "..."}
                                            </p>
                                            <div className="new-tablets-card-footer">
                                                <p className="new-tablets-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>
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
                </div>)
            }
        </div>
    )
}

export default NewTablets
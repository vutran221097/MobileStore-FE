import React, {
    useState,
    useEffect,
} from 'react';
import "./PhoneBrandPage.css"
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import url from '../../setup'
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import Footer from '../../components/Footer/Footer.js';
import DocumentMeta from 'react-document-meta';

function PhoneBrandPage(props) {
    const [phoneBrand, setPhoneBrand] = useState([])
    const phoneCategory = props.match.params.category
    useEffect(() => {
        async function getPhoneBrand() {
            try {
                const res = await axios.get(`${url}/phones/category/${phoneCategory}`);
                if (res.status === 200) {
                    setPhoneBrand(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getPhoneBrand();
    }, [phoneCategory])

    const meta = {
        title: `Điện thoại ${phoneCategory}`,
    }


    const sortByPriceIncrease = () => {
        const sortByPriceIncrease = [...phoneBrand]
        sortByPriceIncrease.sort((a, b) => { return a.price - b.price })
        setPhoneBrand(sortByPriceIncrease)
    }

    const sortByPriceDecrease = () => {
        const sortByPriceDecrease = [...phoneBrand]
        sortByPriceDecrease.sort((a, b) => { return b.price - a.price })
        setPhoneBrand(sortByPriceDecrease)
    }

    const sortByNew = () => {
        const sortByNew = [...phoneBrand]
        sortByNew.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
        setPhoneBrand(sortByNew)
    }

    const sortByOld = () => {
        const sortByOld = [...phoneBrand]
        sortByOld.sort((a, b) => { return new Date(a.createdAt) - new Date(b.createdAt) })
        setPhoneBrand(sortByOld)
    }


    return (
        <div className="phone-brand-page">
            <DocumentMeta {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <div className="phone-brand">
                <div className="phone-brand-function">
                    <div className="phone-brand-header-title"><p>Sản phẩm</p></div>
                    <div className="phone-brand-sort">

                        <div className="phone-brand-sort-item">
                            <input type="radio" id="sortByPriceIncrease" name="sort" value="sortByPriceIncrease" onClick={sortByPriceIncrease} />
                            <label htmlFor="sortByPriceIncrease">Theo giá tăng dần</label>
                        </div>

                        <div className="phone-brand-sort-item">
                            <input type="radio" id="sortByPriceDecrease" name="sort" value="sortByPriceDecrease" onClick={sortByPriceDecrease} />
                            <label htmlFor="sortByPriceDecrease">Theo giá giảm dần</label>
                        </div>

                        <div className="phone-brand-sort-item">
                            <input type="radio" id="sortByNew" name="sort" value="sortByDateNew" onClick={sortByNew} />
                            <label htmlFor="sortByDateNew">Điện thoại mới nhập</label>
                        </div>

                        <div className="phone-brand-sort-item">
                            <input type="radio" id="sortByDateOld" name="sort" value="sortByDateOld" onClick={sortByOld} />
                            <label htmlFor="sortByDateOld">Điện thoại cũ</label>
                        </div>
                    </div>
                </div>
                <div className="phone-brand-items">
                    <div className="phone-brand-header-title"><p>Điện thoại <span style={{ textTransform: "capitalize" }}>{phoneCategory}</span></p></div>
                    <div className="phone-brand-content">
                        {phoneBrand.map((item) => {
                            return (
                                <div className="phone-brand-item" key={item._id}>
                                    <Card className="phone-brand-card">
                                        <Card.Img className="phone-brand-image" variant="top" src={`${url}/uploads/${item.image}`} />
                                        <Card.Body>
                                            <p className="phone-brand-title">{item.name}</p>
                                            <p className="phone-brand-description">
                                                {item.description.substring(0, 50)}
                                            </p>
                                            <div className="phone-brand-card-footer">
                                                <p className="phone-brand-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>
                                                <Link to={`/phones/${item._id}`}>
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
            </div>
            <Footer />
        </div>

    )
}

export default PhoneBrandPage
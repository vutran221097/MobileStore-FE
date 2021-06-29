import React, {
    useState,
    useEffect,
} from 'react';
import "./ProductsPage.css"
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import url from '../../setup'
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import Footer from '../../components/Footer/Footer.js';
import getBodyContent from '../../components/DemoContent/DemoBodyContent';
import DocumentMeta from 'react-document-meta';

function ProductsPage(props) {
    const [products, setProducts] = useState([])
    const productsCategory = props.match.params.category
    useEffect(() => {
        async function getProducts() {
            try {
                const res = await axios.get(`${url}/products/category/${productsCategory}`);
                if (res.status === 200) {
                    setProducts(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getProducts();
    }, [productsCategory])

    const meta = {
        title: productsCategory === "accessories" ? "Phụ kiện" 
        : productsCategory === "tablet" ? "Máy tính bảng" 
        : productsCategory === "apple" ? "Điện thoại iphone"
        : "Điện thoại " + productsCategory,
    }


    const sortByPriceIncrease = () => {
        const sortByPriceIncrease = [...products]
        sortByPriceIncrease.sort((a, b) => { return a.price - b.price })
        setProducts(sortByPriceIncrease)
    }

    const sortByPriceDecrease = () => {
        const sortByPriceDecrease = [...products]
        sortByPriceDecrease.sort((a, b) => { return b.price - a.price })
        setProducts(sortByPriceDecrease)
    }

    const sortByNew = () => {
        const sortByNew = [...products]
        sortByNew.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
        setProducts(sortByNew)
    }

    const sortByOld = () => {
        const sortByOld = [...products]
        sortByOld.sort((a, b) => { return new Date(a.createdAt) - new Date(b.createdAt) })
        setProducts(sortByOld)
    }


    return (
        <div className="products">
            <DocumentMeta {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <div className="products-page">
                
                <div className="products-page-items">
                    <div className="products-page-header-title"><p style={{ textTransform: "capitalize" }}>{productsCategory === "accessories" ? "Phụ kiện " 
                                                                                                            : productsCategory === "tablet" ? "Máy tính bảng " 
                                                                                                            : productsCategory === "apple" ? "Điện thoại iphone"
                                                                                                            : "Điện thoại " + productsCategory}</p></div>
                    <div className="products-page-content">
                        {products.map((item) => {
                            return (
                                <div className="products-page-item" key={item._id}>
                                    <Card className="products-page-card">
                                        <Card.Img className="products-page-image" variant="top" src={`${url}/uploads/${item.image}`} />
                                        <Card.Body>
                                            <p className="products-page-title">{item.name}</p>
                                            <p className="products-page-description">
                                                {getBodyContent(item.description).slice(0,50)+"..."}
                                            </p>
                                            <div className="products-page-card-footer">
                                                <p className="products-page-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>
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
                <div className="products-page-function">
                    <div className="products-page-header-title"><p>Sản phẩm</p></div>
                    <div className="products-page-sort">

                        <div className="products-page-sort-item">
                            <input type="radio" id="sortByPriceIncrease" name="sort" value="sortByPriceIncrease" onClick={sortByPriceIncrease} />
                            <label htmlFor="sortByPriceIncrease">Theo giá tăng dần</label>
                        </div>

                        <div className="products-page-sort-item">
                            <input type="radio" id="sortByPriceDecrease" name="sort" value="sortByPriceDecrease" onClick={sortByPriceDecrease} />
                            <label htmlFor="sortByPriceDecrease">Theo giá giảm dần</label>
                        </div>

                        <div className="products-page-sort-item">
                            <input type="radio" id="sortByNew" name="sort" value="sortByDateNew" onClick={sortByNew} />
                            <label htmlFor="sortByDateNew">Sản phẩm mới nhập</label>
                        </div>

                        <div className="products-page-sort-item">
                            <input type="radio" id="sortByDateOld" name="sort" value="sortByDateOld" onClick={sortByOld} />
                            <label htmlFor="sortByDateOld">Sản phẩm cũ</label>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default ProductsPage
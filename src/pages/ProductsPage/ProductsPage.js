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
import Pagination from '../../components/Pagination/Pagination';

function ProductsPage(props) {
    const [products, setProducts] = useState([])
    const productsCategory = props.match.params.category

    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [sortByPrice, setSortByPrice] = useState("")
    const [sortByDate, setSortByDate] = useState(-1)

    useEffect(() => {
        async function getProducts() {
            try {
                const res = await axios.get(`${url}/products?category=${productsCategory}&page=${page}&sortByPrice=${sortByPrice}&sortByDate=${sortByDate}`);
                if (res.status === 200) {
                    setProducts(res.data.products);
                    setPages(res.data.pages)
                }
            } catch (error) {
                console.error(error);
            }
        }
        getProducts();
    }, [productsCategory, sortByPrice, sortByDate, page])

    const meta = {
        title: productsCategory === "accessories" ? "Phụ kiện"
            : productsCategory === "tablet" ? "Máy tính bảng"
                : productsCategory === "apple" ? "Điện thoại iphone"
                    : "Điện thoại " + productsCategory,
    }


    const sortByPriceIncrease = () => {
        const sortByPrice = [...products]
        setSortByDate("")
        setSortByPrice(1)
        setProducts(sortByPrice)
    }

    const sortByPriceDecrease = () => {
        const sortByPrice = [...products]
        setSortByDate("")
        setSortByPrice(-1)
        setProducts(sortByPrice)
    }

    const sortByNew = () => {
        const sortByDate = [...products]
        setSortByPrice("")
        setSortByDate(-1)
        setProducts(sortByDate)
    }

    const sortByOld = () => {
        const sortByDate = [...products]
        setSortByPrice("")
        setSortByDate(1)
        setProducts(sortByDate)
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
                    <div className=" d-flex flex-column">
                        <div className="products-page-content">
                        {products.map((item) => {
                            return (
                                <Link to={`/product/${item._id}`} key={item._id}>
                                    <div className="products-page-item" >
                                        <Card className="products-page-card">
                                            <Card.Img className="products-page-image" variant="top" src={`${url}/uploads/${item.image}`} />
                                            <Card.Body>
                                                <p className="products-page-title">{item.name}</p>
                                                <p className="products-page-description">
                                                    {getBodyContent(item.description).slice(0, 50) + "..."}
                                                </p>
                                                <div className="products-page-card-footer">
                                                    <p className="products-page-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>

                                                    <Button variant="danger">
                                                        Mua ngay
                                                    </Button>

                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </Link>
                            )
                        })}
                        </div>
                        <div className="d-flex flex-column align-items-center my-2">
                            <div>Page {page}</div>
                            <Pagination page={page} pages={pages} changePage={setPage} />
                        </div>
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
                            <label htmlFor="sortByDateNew">Sản phẩm mới</label>
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
import React, {
    useState,
    useEffect,
} from 'react';
import "./ProductDetailsPage.css"
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import url from '../../setup'
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import Footer from '../../components/Footer/Footer.js';
import DocumentMeta from 'react-document-meta';
import { connect } from "react-redux";
import { AddCart } from "../../actions/cart";

function ProductDetailsPage(props) {
    const [productDetails, setProductDetails] = useState({})
    const productId = props.match.params.id

    const getProductDetails = async () => {
        try {
            const res = await axios.get(`${url}/products/${productId}`);
            if (res.status === 200) {
                setProductDetails(res.data);
                const body = document.getElementById('product-details-description')
                const obj = JSON.parse(res.data.description)
                body.innerHTML = obj.body
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProductDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const meta = {
        title: productDetails.name,
    }

    return (
        <div className="product-details-page">
            <DocumentMeta style={{ textTransform: "capitalize" }} {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <div className="product-details">
                <div className="product-details-news">
                    Điện thoại cùng loại <br />
                    NEWS

                </div>
                <div className="product-details-items">
                    <div className="product-details-header-title"><p>{productDetails.category === "accessories" ? "Phụ Kiện "
                        : productDetails.category === "tablet" ? "Máy Tính Bảng "
                            : "Điện Thoại "} <span style={{ textTransform: "capitalize" }}>{productDetails.name}</span></p></div>
                    <div className="product-details-content">
                        <div className="product-details-item" key={productDetails._id}>
                            <Card className="product-details-card">
                                <div className="product-details-item-header">
                                    <div className="product-details-item-header-image">
                                        <img className="product-details-image" variant="top" src={`${url}/uploads/${productDetails.image}`} alt={productDetails._id} />
                                    </div>
                                    <div className="product-details-item-header-information">
                                        <h1 className="product-details-title">{productDetails.name}</h1>
                                        <p className="product-details-brand">Thương hiệu: <span style={{ textTransform: "capitalize" }}>{productDetails.category}</span></p>
                                        <p className="product-details-color">Màu: {productDetails.color}</p>
                                        <p className="product-details-guarantee">Số tháng bảo hành: {productDetails.guarantee}<sup>th</sup></p>
                                        <p className="product-details-available">Tình trạng: {productDetails.available = "available" ? "Còn hàng" : "Hết hàng"}</p>
                                        <h2 className="product-details-price">Giá: {parseInt(productDetails.price).toLocaleString('de-DE')}<sup>đ</sup></h2>
                                        <div className="product-details-add-to-cart">
                                            <Button variant="danger" onClick={() => props.AddCart(productDetails)} >Thêm vào giỏ hàng</Button>
                                        </div>
                                    </div>
                                </div>

                                <Card.Body>
                                    <div id="product-details-description">

                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}


const mapStateToProps = state => {
    return {
        productDetails: state._productCart,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        AddCart: item => dispatch(AddCart(item)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsPage)
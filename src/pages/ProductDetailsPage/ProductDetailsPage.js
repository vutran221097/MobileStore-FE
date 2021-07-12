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
import { ToastContainer, toast } from 'react-toastify';
import getImageContent from '../../components/DemoContent/DemoImageContent.js'
import { Link,useLocation } from 'react-router-dom'


function ProductDetailsPage(props) {
    const [productDetails, setProductDetails] = useState({})
    const [products, setProducts] = useState([])

    const location = useLocation();
    const productId = props.match.params.id
    const getProductDetails = async () => {
        try {
            const res = await axios.get(`${url}/products/${productId}`);
            if (res.status === 200) {
                setProductDetails(res.data);
                const image = document.querySelector(".product-details-item-header-image")
                image.innerHTML= `<img className="product-details-image" src="${url}/uploads/${res.data.image}" alt="${res.data._id}" />`
                const body = document.getElementById('product-details-description')
                const obj = JSON.parse(res.data.description)
                body.innerHTML = obj.body
                try {
                    const res1 = await axios.get(`${url}/products?category=${res.data.category}`)
                    if (res1.status === 200) {
                        setProducts(res1.data.products.slice(0, 5));
                    }
                } catch (e) {
                    console.log(e)
                }


            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProductDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const meta = {
        title: productDetails.name,
    }

    const successMess = () => {
        return toast.success('Sản phẩm đã thêm vào giỏ hàng!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const errorMess = () => {
        toast.error('Sản phẩm đã hết hàng!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const AddItem = (item) => {
        return props.AddCart(item)
    }

    return (
        <div className="product-details-page">
            <DocumentMeta style={{ textTransform: "capitalize" }} {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <ToastContainer />
            <div className="product-details">
                <div className="product-details-items">
                    <div className="product-details-header-title"><p>{productDetails.category === "accessories" ? "Phụ Kiện "
                        : productDetails.category === "tablet" ? "Máy Tính Bảng "
                            : "Điện Thoại "} <span style={{ textTransform: "capitalize" }}>{productDetails.name}</span></p></div>
                    <div className="product-details-content">
                        <div className="product-details-item">
                            <Card className="product-details-card">
                                <div className="product-details-item-header">
                                    <div className="product-details-item-header-image">

                                    </div>
                                    <div className="product-details-item-header-information">
                                        <h3 className="product-details-title">{productDetails.name}</h3>
                                        <p className="product-details-brand">Thương hiệu: <span style={{ textTransform: "capitalize" }}>{productDetails.category}</span></p>
                                        <p className="product-details-color">Màu: {productDetails.color}</p>
                                        <p className="product-details-guarantee">Số tháng bảo hành: {productDetails.guarantee}<sup>th</sup></p>
                                        <p className="product-details-available">Tình trạng: {productDetails.available === "available" ? "Còn hàng" : "Hết hàng"}</p>
                                        <h2 className="product-details-price">Giá: {parseInt(productDetails.price).toLocaleString('de-DE')}<sup>đ</sup></h2>
                                        {productDetails.category==="accessories" ? (<small style={{color:"red",margin:"0 0 1rem 0"}}>*Giảm ngay 5% cho mỗi sản phẩm phụ kiện khi mua cùng sản phẩm điện thoại hoặc máy tính bảng</small>) : null}
                                        <div className="product-details-add-to-cart">
                                            <Button variant="danger" onClick={() => {
                                                productDetails.available === "available" ? AddItem(productDetails) && successMess() : errorMess()
                                            }} >Thêm vào giỏ hàng</Button>
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
                <div className="product-details-news">
                    <div className="same-products">
                        <div className="same-products-header-title"><p>Sản phẩm cùng loại</p></div>
                        <div className="same-product-items">
                            {products.map((item) => {
                                let imageBody = JSON.parse(item.description)
                                let [contentImage] = getImageContent(imageBody.body);
                                let image = [...contentImage].splice(0, 1).map((item) => item.src)
                                return (
                                    <Link to = {`/product/${item._id}`} key={item._id} >
                                    <div className="same-products-item" >
                                        <img src={image[0]} alt={item._id} style={{ width: "100%" }} />
                                        <p>{item.name}</p>
                                    </div>
                                    </Link>
                                )
                            })}
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

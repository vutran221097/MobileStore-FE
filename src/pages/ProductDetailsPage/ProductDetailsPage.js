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
import StringToHtml from '../../components/StringToHtml/StringToHtml';
import DocumentMeta from 'react-document-meta';
import { connect } from "react-redux";
import { AddCart } from "../../actions/cart";

function ProductDetailsPage(props) {
    const [productDetails, setProductDetails] = useState({})
    const phoneId = props.match.params.id
    useEffect(() => {
        async function getProductDetails() {
            try {
                const res = await axios.get(`${url}/products/${phoneId}`);
                if (res.status === 200) {
                    setProductDetails(res.data.products);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getProductDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const meta = {
        title: productDetails.name,
    }

    return (
        <div className="phone-details-page">
            <DocumentMeta style={{textTransform:"capitalize"}} {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <div className="phone-details">
                <div className="phone-details-news">
                    Điện thoại cùng loại <br/>
                    NEWS

                </div>
                <div className="phone-details-items">
                    <div className="phone-details-header-title"><p>{productDetails.category=== "accessories" ? "Phụ Kiện " 
                                                                                                            : productDetails.category=== "tablet" ? "Máy Tính Bảng " 
                                                                                                            : "Điện Thoại " } <span style={{ textTransform: "capitalize" }}>{productDetails.name}</span></p></div>
                    <div className="phone-details-content">
                        <div className="phone-details-item" key={productDetails._id}>
                            <Card className="phone-details-card">
                                <div className="phone-details-item-header">
                                    <div className="phone-details-item-header-image">
                                        <img className="phone-details-image" variant="top" src={`${url}/uploads/${productDetails.image}`} alt={productDetails._id}/>
                                    </div>
                                    <div className="phone-details-item-header-information">
                                        <h1 className="phone-details-title">{productDetails.name}</h1>
                                        <p className="phone-details-brand">Thương hiệu: <span style={{textTransform:"capitalize"}}>{productDetails.category}</span></p>
                                        <p className="phone-details-color">Màu: {productDetails.color}</p>
                                        <p className="phone-details-guarantee">Số tháng bảo hành: {productDetails.guarantee}<sup>th</sup></p>
                                        <h2 className="phone-details-price">Giá: {parseInt(productDetails.price).toLocaleString('de-DE')}<sup>đ</sup></h2>
                                        <div className="phone-details-add-to-cart">
                                            <Button variant="danger" onClick={() => props.AddCart(productDetails)} >Thêm vào giỏ hàng</Button>
                                        </div>
                                    </div>
                                </div>

                                <Card.Body>
                                    <p className="phone-details-description">
                                        {StringToHtml(productDetails.description)}
                                    </p>
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


const mapStateToProps = state =>{
    return {
         productDetails: state._productCart,
       };
}
function mapDispatchToProps(dispatch){
    return{
        AddCart:item=>dispatch(AddCart(item)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  ) (ProductDetailsPage)
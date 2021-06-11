import React, {
    useState,
    useEffect,
} from 'react';
import "./PhoneDetailsPage.css"
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import url from '../../setup'
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import Footer from '../../components/Footer/Footer.js';
import DocumentMeta from 'react-document-meta';

function PhoneDetailsPage(props) {
    const [phoneDetails, setPhoneDetails] = useState({})
    const phoneId = props.match.params.id
    useEffect(() => {
        async function getPhoneDetails() {
            try {
                const res = await axios.get(`${url}/phones/${phoneId}`);
                if (res.status === 200) {
                    setPhoneDetails(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getPhoneDetails();
    }, [phoneId])

    const meta = {
        title: `Điện thoại ${phoneDetails.name}`,
    }

    return (
        <div className="phone-details-page">
            <DocumentMeta {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <div className="phone-details">
                <div className="phone-details-items">
                    <div className="phone-details-header-title"><p>Điện thoại <span style={{ textTransform: "capitalize" }}>{phoneDetails.name}</span></p></div>
                    <div className="phone-details-content">
                        <div className="phone-details-item" key={phoneDetails._id}>
                            <Card className="phone-details-card">
                                <Card.Img className="phone-details-image" variant="top" src={`${url}/uploads/${phoneDetails.image}`} />
                                <Card.Body>
                                    <p className="phone-details-title">{phoneDetails.name}</p>
                                    <p className="phone-details-description">
                                        {phoneDetails.description}
                                    </p>
                                    <div className="phone-details-card-footer">
                                        <p className="phone-details-price">{parseInt(phoneDetails.price).toLocaleString('de-DE')}<sup>đ</sup></p>
                                        <Button variant="danger" >Thêm vào giỏ hàng</Button>
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


export default PhoneDetailsPage
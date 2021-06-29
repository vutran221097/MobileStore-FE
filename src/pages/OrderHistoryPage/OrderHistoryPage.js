import React, {
    useState,
} from 'react';
import './OrderHistoryPage.css'
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import Footer from '../../components/Footer/Footer.js';
// import getBodyContent from '../../components/DemoContent/DemoBodyContent';
import DocumentMeta from 'react-document-meta';
import firebase from './firebase.js'
import image from '../../images/order-history.png'


function OrderHistoryPage() {
    // const [orderHistory, setOrderHistory] = useState([])
    const [phoneNum, setPhoneNum] = useState("")
    const meta = {
        title: "Lịch sử giao dịch"
    }

    const setUpRecapcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
        });
    }

    const onSignInSubmit = (e) => {
        e.preventDefault();
        setUpRecapcha();
        const phoneNumber = phoneNum;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...

                const code = window.prompt("Enter OTP");
                confirmationResult.confirm(code)
                .then((result) => {
                    // User signed in successfully.
                    const user = result.user;
                    console.log(user + "signin")
                }).catch((error) => {
                    // User couldn't sign in (bad verification code?)
                    // ...
                });
            }).catch((error) => {
                // Error; SMS not sent
                // ...
            });
    }

    const onChangePhoneNum = (e) => {
        setPhoneNum(e.target.value)
    }

    return (
        <div className="order">
            <DocumentMeta {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <div className="order-history-page">
                <img src={image} alt="history" style={{ width: "100%" }} />
                <h1>Tra cứu thông tin đơn hàng</h1>

                <form onSubmit={onSignInSubmit} >
                    <div id="recaptcha-container"></div>
                    <div className="form-group">
                        <input type="number" value={phoneNum} onChange={onChangePhoneNum} placeholder="Nhập số điện thoại mua hàng" />
                    </div>
                    <button type="submit" class="btn">Tiếp tục</button>
                </form>

            </div>
            <Footer />
        </div>

    )
}

export default OrderHistoryPage
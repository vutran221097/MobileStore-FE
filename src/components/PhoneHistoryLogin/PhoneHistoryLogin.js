import React, { useState } from 'react'
import firebase from './firebase.js'
import './PhoneHistoryLogin.css'
import image from '../../images/order-history.png'
import { useHistory } from 'react-router-dom'

function PhoneHistoryLogin() {
    const [phoneNum, setPhoneNum] = useState("")
    const history = useHistory();
    const setUpRecapcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            'recaptcha-container',
            {
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
        const phoneNumber = "+84" + phoneNum;
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
                        // const user = result.user;
                        sessionStorage.setItem("phoneNumber", phoneNum);
                        history.push("/history/order")
                    }).catch((error) => {
                        console.log(error)
                        window.location.reload()
                        // User couldn't sign in (bad verification code?)
                        // ...
                    });
            }).catch((error) => {
                console.log(error)
                // Error; SMS not sent
                // ...
            });
    }

    const onChangePhoneNum = (e) => {
        setPhoneNum(e.target.value)
    }
    return (
        <div className="order-login-page" >
            <img src={image} alt="history" style={{ width: "100%" }} />
            <h2>Tra c???u th??ng tin ????n h??ng</h2>
            <form onSubmit={onSignInSubmit} >
                <div id="recaptcha-container"></div>
                <div className="form-group">
                    <input pattern="[\d]{9,11}$" title="S??? ??i???n tho???i t??? 9 -11 s???" minLength="9" maxLength="11" type="tel" value={phoneNum} onChange={onChangePhoneNum} placeholder="Nh???p s??? ??i???n tho???i mua h??ng" />
                </div>
                <button type="submit" className="btn">Ti???p t???c</button>
            </form>
        </div>
    )
}

export default PhoneHistoryLogin
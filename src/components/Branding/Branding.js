import React from 'react';
import logo from '../../images/logo-branding.png';
import './Branding.css'
import tag from '../../images/tag-branding.png'
import transport from '../../images/transport-branding.png';
import support from '../../images/support-branding.png';
import phone from '../../images/phone-branding.png';

function Branding() {
    return (
        <div className="branding-homepage">
            <div className="branding-items d-flex my-2  ">
                <div className="branding-logo">
                    <img src={logo} alt="branding logo" />
                </div>
                <div className="branding-informations">
                    <div className="branding-tutorial d-flex align-items-center justify-content-center">
                        <div className="branding-images mr-3">
                            <img src={tag} alt="tutorial" />
                        </div>
                        <p className="branding-text">
                            HƯỚNG DẪN 
                            <br />
                            Mua trả góp
                        </p>
                    </div>
                    <div className="branding-transport d-flex align-items-center justify-content-center" >
                        <div className="branding-images mr-3">
                            <img src={transport} alt="transport" />
                        </div>
                        <p className="branding-text">
                            VẬN CHUYỂN
                            <br />
                            Vận chuyển toàn quốc
                        </p>
                    </div>
                    <div className="branding-serve d-flex align-items-center justify-content-center">
                        <div className="branding-images mr-3">
                            <img src={support} alt="serve" />
                        </div>
                        <p className="branding-text">
                            PHỤC VỤ
                            <br />
                            Hoạt động 24/07
                        </p>
                    </div>
                    <div className="branding-hotline d-flex align-items-center justify-content-center">
                        <div className="branding-images mr-3">
                            <img src={phone} alt="hot line" />
                        </div>
                        <p className="branding-text">
                            HOTLINE
                            <br />
                            098 721 6425
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Branding;
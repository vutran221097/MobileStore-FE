import React from 'react'
import phone from '../../images/header/phone-call.png'
import email from '../../images/header/email.png'
import address from '../../images/header/location-pin.png'
import './Header.css'
function Header() {
    return (
        <div className="header">
            <div className="header-left col-lg-8">
                <div className="header-left-items d-flex flex-wrap align-items-center">
                    <div className="header-phonenumber col-lg-5 col-sm-4 text-nowrap">
                        <img src={phone} alt="Số điện thoại tư vấn" />
                        <span>
                            &nbsp;Tư vấn miễn phí: 098 721 6425
                        </span>
                    </div>
                    <div className="header-email col-lg-3 col-sm-4 text-nowrap">
                        <img src={email} alt="Email" />
                        <span>
                            &nbsp;Email: tranvu221097@gmail.com
                        </span>
                    </div>
                </div>
            </div>
            <div className="header-right col-lg-4 text-nowrap">
                <div className="header-address">
                    <img src={address} alt="Địa chỉ cửa hàng" />
                    <span>
                        &nbsp;168 Lương Thế Vinh, Thanh Xuân, Hà Nội
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Header;
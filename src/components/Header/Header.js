import React from 'react';
import phone from '../../images/phone-call.png';
import email from '../../images/email.png'
import address from '../../images/location-pin.png'
import './Header.css'
function Header() {
    return(
        <div className="header-pagehome d-flex flex-wrap my-2 mx-5">
            <div className="header-left col-lg-8">
                <div className="header-left-items d-flex flex-wrap align-items-center">
                <div className="header-phonenumber col-sm-4 text-nowrap">
                    <img src={phone} alt="Số điện thoại tư vấn"/>
                    &nbsp;Tư vấn miễn phí: 098 721 6425
                </div>
                <div className="header-email col-sm-4 text-nowrap">
                    <img src={email} alt="Email"/>
                    &nbsp;Email: tranvu221097@gmail.com 
                </div>
                </div>
            </div>
            <div className="header-right col-lg-4 text-nowrap">
                <div className="header-address">
                    <img src={address} alt="Địa chỉ cửa hàng"/>
                    168 Lương Thế Vinh, Thanh Xuân, Hà Nội
                </div>
            </div>
        </div>
    )
}

export default Header;
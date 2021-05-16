import React from 'react';
import phone from '../../images/phone-call.png';
import email from '../../images/email.png'
import address from '../../images/location-pin.png'
function Header() {
    return(
        <div className="header-pagehome d-flex flex-wrap my-2">
            <div className="header-left col-lg-8">
                <div className="d-flex flex-row flex-wrap align-items-center">
                <div className="header-phonenumber col-lg-4 col-sm-6 text-nowrap">
                    <img src={phone} alt="Số điện thoại tư vấn"/>
                    &nbsp;Tư vấn miễn phí: 098 721 6425
                </div>
                <div className="header-email col-lg-4 col-sm-6 text-nowrap ">
                    <img src={email} alt="Email"/>
                    &nbsp;Email: tranvu221097@gmail.com 
                </div>
                </div>
            </div>
            <div className="header-right col-lg-4 text-nowrap">
                <div className="header-address" style={{padding:"0 15px"}}>
                    <img src={address} alt="Địa chỉ cửa hàng"/>
                    168 Lương Thế Vinh, Thanh Xuân, Hà Nội
                </div>
            </div>
        </div>
    )
}

export default Header;
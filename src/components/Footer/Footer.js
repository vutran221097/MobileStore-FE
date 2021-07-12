import React, { useState, useEffect } from "react";
import './Footer.css'
import image from '../../images/map-store.png'
import { Link } from "react-router-dom"

function formatDate(date) {
    if (!date) return "";
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
}

function Footer() {
    const [timeString, setTimeString] = useState("");
    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now);

            setTimeString(newTimeString);
        }, 1000);
        return () => {
            clearInterval(clockInterval);
        };
    }, []);
    return (
        <div className='footer'>
            <div className='footer-top py-3'>
                <div className='footer-service pb-2'>
                    <h5 className="widget-title">VỀ CHÚNG TÔI</h5>
                    <p>Bán &amp; sửa chữa điện thoại </p>
                    <p>Hướng dẫn mua hàng</p>
                    <p>Chính sách bảo hành</p>
                    <p>Thanh toán</p>
                    <p>Chương trình khuyến mại</p>
                </div>
                <div className='footer-contact pb-2'>
                    <h5>THÔNG TIN LIÊN HỆ</h5>
                    <p>Địa chỉ: 168 Lương Thế Vinh, Thanh Xuân, Hà Nội</p>
                    <p>Số điện thoại: 0987216425</p>
                    <p>Email: mobilestore25@gmail.com</p>
                    <p>Website: mobilestore.net</p>
                </div>
                <div className='footer-map pb-2'>
                    <Link
                        to="https://www.google.com/maps/place/168+L%C6%B0%C6%A1ng+Th%E1%BA%BF+Vinh,+P.+V%C4%83n+Qu%C3%A1n,+Thanh+Xu%C3%A2n,+H%C3%A0+N%E1%BB%99i/@20.990663,105.7943534,17z/data=!4m5!3m4!1s0x3135acb85df6ca07:0x3c9d94d9c0e991fd!8m2!3d20.990663!4d105.7965421"
                        target="_blank"
                        rel="noopener noreferrer">
                        <img src={image} alt="map" />
                    </Link>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='footer-policy'>
                    <p style={{ margin: "0" }}>©2021 Mobile Store</p>
                </div>
                <div className='footer-time'>
                    <p style={{ margin: "0" }}>{timeString}</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
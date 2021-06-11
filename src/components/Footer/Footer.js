import React, { useState, useEffect } from "react";
import './Footer.css'

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
                <div className='footer-fanpage pb-2'>
                    <h5>FANPAGE</h5>

                    <div className="fb-page"
                        data-href="https://www.facebook.com/profile.php?id=100068839505063"
                        data-width="380"
                        data-hide-cover="false"
                        data-show-facepile="false"></div>
                    {/* <div className="fb-page"
                        data-href="https://www.facebook.com/profile.php?id=100068839505063"
                        style={{ width: "100%" }}
                        data-small-header="true"
                        data-adapt-container-width="true"
                        data-hide-cover="true"
                        data-show-facepile="false">
                        <blockquote cite="https://www.facebook.com/profile.php?id=100068839505063"
                            className="fb-xfbml-parse-ignore">
                            <a href="https://www.facebook.com/profile.php?id=100068839505063">MobileStore</a>
                        </blockquote>
                    </div> */}
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
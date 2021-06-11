import React from 'react';
import './Slide.css';
import { Carousel } from 'react-bootstrap'
import slide1 from '../../images/slide/slide1.jpg';
import slide2 from '../../images/slide/slide2.jpg';
import slide3 from '../../images/slide/slide3.jpg';

function Slide() {
    const slideItems = [
        {
            title: "Iphone chính hãng quốc tế",
            img: slide1
        },
        {
            title: "Iphone cũ giá rẻ",
            img: slide2
        },
        {
            title: "Điện thoại Oppo",
            img: slide3
        }

    ]
    return (
        <div className="slide">
            <Carousel fade>
                {slideItems.map((item, index) => {
                    return (
                        <Carousel.Item interval={3000} key={index}>
                            <img
                                className="d-block w-100"
                                src={item.img}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>{item.title}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default Slide;
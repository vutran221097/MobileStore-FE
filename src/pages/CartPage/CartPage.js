import React from "react";
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import Footer from '../../components/Footer/Footer.js';

function CartPage() {
    return (
        <div className="cart-page">
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <div className="cart-page-container">
               
            </div>
            <Footer />
        </div>
    );
}

export default CartPage



import React from 'react';
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts.js';
import Footer from '../../components/Footer/Footer.js';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Branding />
      <Navbar />
      <Slide />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}

export default HomePage;

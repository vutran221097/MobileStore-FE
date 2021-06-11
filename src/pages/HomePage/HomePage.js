import React from 'react';
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import NewProducts from '../../components/NewProducts/NewProducts.js';
import RecentlyNews from '../../components/RecentlyNews/RecentlyNews.js';
import Footer from '../../components/Footer/Footer.js';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Branding />
      <Navbar />
      <Slide />
      <NewProducts />
      <RecentlyNews />
      <Footer />
    </div>
  );
}

export default HomePage;

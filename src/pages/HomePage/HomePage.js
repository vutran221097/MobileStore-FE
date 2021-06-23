import React from 'react';
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import NewPhones from '../../components/NewPhones/NewPhones.js';
import NewTablets from '../../components/NewTablets/NewTablets.js';
import NewAccessories from '../../components/NewAccessories/NewAccessories.js';
import RecentlyNews from '../../components/RecentlyNews/RecentlyNews.js';
import Footer from '../../components/Footer/Footer.js';
import DocumentMeta from 'react-document-meta';

function HomePage() {
  const meta = {
    title: "Mobile Store"
  }
  return (
    <div className="home-page">
      <DocumentMeta {...meta}/>
      <Header />
      <Branding />
      <Navbar />
      <Slide />
      <NewPhones />
      <NewTablets />
      <NewAccessories />
      <RecentlyNews />
      <Footer />
    </div>
  );
}

export default HomePage;

import React from "react";
import Header from "../../components/Header/Header.js";
import Branding from "../../components/Branding/Branding.js";
import Navbar from "../../components/Navbar/Navbar.js";
import Slide from "../../components/Slide/Slide.js";
import RecentlyNews from "../../components/RecentlyNews/RecentlyNews.js";
import Footer from "../../components/Footer/Footer.js";
import DocumentMeta from "react-document-meta";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import ListItem from "../../components/ListItem/ListItem.js";

const HomePage = () => {
  const meta = {
    title: "Mobile Store",
  };
  return (
    <div className="home-page">
      <DocumentMeta {...meta} />
      <Header />
      <Branding />
      <Navbar />
      <Slide />
      <SearchBar />
      <ListItem type="phone" title="Điện thoại" />
      <ListItem type="tablet" title="Máy tính bảng" />
      <ListItem type="accessories" title="Phụ kiện" />
      <RecentlyNews />
      <Footer />
    </div>
  );
};

export default HomePage;

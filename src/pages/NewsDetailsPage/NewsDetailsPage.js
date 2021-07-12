import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header.js'
import axios from 'axios'
import url from '../../setup.js'
import Footer from '../../components/Footer/Footer.js'
import DocumentMeta from 'react-document-meta';
import Slide from '../../components/Slide/Slide.js';
import Branding from '../../components/Branding/Branding.js';
import './NewsDetailsPage.css'

function DetailNews(props) {
  const [newsItem, setNewItem] = useState({});
  const idNew = props.match.params.id;
  
  useEffect(() => {
    async function getNews() {
      try {
        const res = await axios.get(`${url}/news/${idNew}`);
        setNewItem(res.data);
        const body = document.getElementById('news-details-body')
        const obj = JSON.parse(res.data.body)
        body.innerHTML = obj.body
      } catch (error) {
        console.error(error);
      }
    }
    getNews();
  }, [idNew])


  const meta = {
    title: newsItem.title,
  }


  return (
    <div className='news-details-page'>
      <DocumentMeta style={{ textTransform: "capitalize" }} {...meta} />
      <Header />
      <Branding />
      <Navbar />
      <Slide />
      <div className='news-details-container'>
        <div className="news-details-item">
          <h1>{newsItem.title}</h1>
          <div id="news-details-body">
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailNews;
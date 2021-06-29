import React, {
    useState,
    useEffect,
} from 'react';
import axios from 'axios';
import url from '../../setup'
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import Footer from '../../components/Footer/Footer.js';
import DocumentMeta from 'react-document-meta';

function NewsPage() {
    const [news, setNews] = useState([])

    const getNews = async () => {
        try {
            const res = await axios.get(`${url}/news`);
            if (res.status === 200) {
                setNews(res.data.news);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getNews();
    }, [])

    const meta = {
        title: "Tin tức công nghệ"
    }



    return (
        <div className="news">
            <DocumentMeta {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <div className="news-page">
            {news.map((item)=>{
                return (
                    <>
                        <div className="news-page-container">
                            <p>{item.title}</p>
                        </div>
                    </>
                )
            })}
            </div>
            <Footer />
        </div>

    )
}

export default NewsPage
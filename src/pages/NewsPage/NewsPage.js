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
import getAllContent from '../../components/DemoContent/DemoAllContent'
import Pagination from "../../components/Pagination/Pagination";
import { Link } from 'react-router-dom';
import './NewsPage.css'

function NewsPage({ match }) {
    const pageNumber = match.params.pageNumber || 1
    const [news, setNews] = useState([])
    const [page, setPage] = useState(pageNumber)
    const [pages, setPages] = useState(1)
    const [, setLoading] = useState(false)



    useEffect(() => {
        const getNews = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${url}/news?page=${page}`);
                if (res.status === 200) {
                    setNews(res.data.news);
                    setPages(res.data.pages)
                    setLoading(false)
                }
            } catch (error) {
                console.error(error);
            }
        }
        getNews();
    }, [page])

    const meta = {
        title: "Tin tức công nghệ"
    }

    const getDate = (item) => {
        let MyDate = new Date(item);
        let MyDateString;

        MyDateString =('0' + MyDate.getDate()).slice(-2) + '/'
            + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/'
            + MyDate.getFullYear();

        return MyDateString
    }

    return (
        <div className="news">
            <DocumentMeta {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <div className="news-page">
                {news.map((item) => {
                    let imageBody = JSON.parse(item.body)
                    let [contentImage, demoContent] = getAllContent(imageBody.body);
                    let image = [...contentImage].splice(0, 1).map((item) => item.src)
                    return (

                        <Link to={`/news/${item._id}`} key={item._id}>
                            <div className="news-page-container" >
                                <div className="news-page-image">
                                    <img src={image[0]} alt={item._id} />
                                </div>
                                <div className="news-page-content">
                                    <h3>{item.title}</h3>
                                    <p>{demoContent.slice(0, 250) + "..."}</p>
                                    <div className="news-page-date">
                                        <p>{getDate(item.createdAt)}</p>
                                    </div>
                                </div>

                            </div>
                        </Link>

                    )
                })}
                <div className="d-flex flex-column align-items-center">
                    <div>Page {page}</div>
                    <Pagination page={page} pages={pages} changePage={setPage} />
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default NewsPage
import React, { useState, useEffect } from 'react'
import './RecentlyNews.css'
import url from '../../setup'
import axios from 'axios'
import StringToHtml from '../StringToHtml/StringToHtml'

function RecentlyNews() {
    const [news, setNews] = useState([])
    const getNews = async () => {
        try {
            const res = await axios.get(`${url}/news`);
            if (res.status === 200) {
                setNews(res.data);
                console.log(res.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="recently-news">
            <div className="recently-news-header-title">Tin tức mới</div>
            <div className="recently-news-content">
                <div className="recently-news-newest">
                    {news.map((item) => {
                        return (
                            <div className="newest" key={item._id}>
                                <p>{item.title}</p>
                                <p>{StringToHtml(item.body)}</p>
                            </div>
                        )
                    }).slice(0,1)}
                </div>
                <div className="recently-news-new">
                    nnnnnnnnnn
                </div>
            </div>
        </div>
    )
}

export default RecentlyNews
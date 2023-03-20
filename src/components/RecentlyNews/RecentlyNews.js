import React, { useState, useEffect } from 'react'
import './RecentlyNews.css'
import url from '../../setup'
import axios from 'axios'
import getImageContent from '../DemoContent/DemoImageContent'
import {Link} from 'react-router-dom'

function RecentlyNews() {
    const [news, setNews] = useState([])
    const [loading,setLoading] = useState(true)
    const getNews = async () => {
        try {
            const res = await axios.get(`${url}/news`);
            if (res.status === 200) {
                setNews(res.data.allNews);
                setLoading(false)
                const newsest1 = res.data.allNews.slice(0, 1);
                let [contentImage1] = getImageContent(newsest1[0].body);
                let img = [...contentImage1][0].outerHTML.replace("\\&quot;", '').replace(`\\&quot;`, '')
                let N = document.getElementById("newsest-image")
                N.innerHTML = img
            }
            
        } catch (error) {
            console.error(error);
            setLoading(false)
            setNews([])
        }
    }

    useEffect(() => {
        getNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

   

    return (
        <div className="recently-news">
            <div className="recently-news-header-title"> <p>Tin tức mới</p></div>
            {loading && <h1 className="text-center">Loading . . . </h1>}
            {!news.length && !loading ? (<h1 className="text-center">Không có tin tức mới. </h1>) : (
            <div className="recently-news-content">
                <div className="recently-news-newest">
                    {
                        news.slice(0, 1).map((item) => {
                            return (
                                <Link to={`/news/${item._id}`} key={item._id}>    
                                <div className="newsest"  >
                                    <div id="newsest-image">
                                    </div>
                                    <h4 className="newsest-tittle">{item.title}</h4>
                                </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="recently-news-oldnews">
                    {news.slice(1, 4).map((item) => {
                        let imageBody = JSON.parse(item.body)
                        let [contentImage] = getImageContent(imageBody.body);
                        let image = [...contentImage].splice(0, 1).map((item) => item.src)
                        return (
                            <Link to={`/news/${item._id}`} key={item._id}>    
                            <div className="oldnews-container" >
                                <div className="oldnews-image1 oldnews-image mr-2">
                                    <img src={image[0]} alt={item._id} />
                                </div>
                                <h5 className="oldnews-title">
                                    {item.title}
                                </h5>
                            </div>
                            </Link>
                        )
                    })}
                </div>
            </div>)}
            
        </div>
    )
}

export default RecentlyNews
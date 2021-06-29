import React, { useState, useEffect } from 'react'
import './RecentlyNews.css'
import url from '../../setup'
import axios from 'axios'
import getImageContent from '../DemoContent/DemoImageContent'

function RecentlyNews() {
    const [news, setNews] = useState([])
    const getNews = async () => {
        try {
            const res = await axios.get(`${url}/news/allNews?limit=4`);
            if (res.status === 200) {
                setNews(res.data);

                const newsest1 = res.data.slice(0, 1);
                let [contentImage1] = getImageContent(newsest1[0].body);
                let img = [...contentImage1][0].outerHTML.replace("\\&quot;", '').replace(`\\&quot;`, '')
                let N = document.getElementById("newsest-image")
                N.innerHTML = img

                const newsest2 = res.data.slice(1, 2);
                let [contentImage2] = getImageContent(newsest2[0].body);
                let img1 = [...contentImage2][0].outerHTML.replace("\\&quot;", '').replace(`\\&quot;`, '')
                let N1 = document.querySelector(".oldnews-image1")
                let T1 = document.querySelector(".oldnews-title1")
                N1.innerHTML = img1
                T1.innerText = newsest2[0].title

                const newsest3 = res.data.slice(2, 3);
                let [contentImage3] = getImageContent(newsest3[0].body);
                let img2 = [...contentImage3][0].outerHTML.replace("\\&quot;", '').replace(`\\&quot;`, '')
                let N2 = document.querySelector(".oldnews-image2")
                let T2 = document.querySelector(".oldnews-title2")
                N2.innerHTML = img2
                T2.innerText = newsest3[0].title

                const newsest4 = res.data.slice(3, 4);
                let [contentImage4] = getImageContent(newsest4[0].body);
                let img3 = [...contentImage4][0].outerHTML.replace("\\&quot;", '').replace(`\\&quot;`, '')
                let N3 = document.querySelector(".oldnews-image3")
                let T3 = document.querySelector(".oldnews-title3")
                N3.innerHTML = img3
                T3.innerText = newsest4[0].title

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
            <div className="recently-news-header-title"> <p>Tin tức mới</p></div>
            <div className="recently-news-content">
                <div className="recently-news-newest">
                    {
                        news.slice(0, 1).map((item) => {
                            return (
                                <div className="newsest" key={item._id}>
                                    <div id="newsest-image">

                                    </div>
                                    <h4>{item.title}</h4>

                                </div>
                            )

                        })
                    }

                </div>
                <div className="recently-news-oldnews">
                    <div className="oldnews-container">
                        <div className="oldnews-image1 oldnews-image mr-2">
                        </div>
                        <h5 className="oldnews-title1 oldnews-title">
                        </h5>
                    </div>

                    <div className="oldnews-container">

                        <div className="oldnews-image2 oldnews-image mr-2">
                        </div>
                        <h5 className="oldnews-title2 oldnews-title">
                        </h5>
                    </div>

                    <div className="oldnews-container">
                        <div className="oldnews-image3 oldnews-image mr-2">
                        </div>
                        <h5 className="oldnews-title3 oldnews-title">
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentlyNews
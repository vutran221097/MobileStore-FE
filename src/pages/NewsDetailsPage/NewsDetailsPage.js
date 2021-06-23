import React, { useEffect, useState }  from 'react'
import Nav from '../../components/navbar/Navbar'
import Header from '../../components/Header/Header.js'
import axios from 'axios'
import url from '../../setup.js'
import Footer from '../../components/Footer/Footer.js'

function DetailNews(props) {
  const [newItem, setNewItem] = useState({});
  const idNew = props.match.params.id;


  useEffect(() => {
    async function getNews() {
      try {
        const res = await axios.get(`${url}/news/${idNew}`);
        setNewItem(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getNews();
  }, [idNew])

  return (
    <div className='detailNews'>
      <Header />
      <Nav />
      <BannerPost title={newItem.title} />
      <div className='post-center'>
        <div className='detailNews-detail'>
          <PostNews titlePost={newItem.title} timePost={newItem.datePosted} contentPost={newItem.body} />
        </div>
        <div className='detailNews-new'>
          <RecentlyNew />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailNews;
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
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import getBodyContent from '../../components/DemoContent/DemoBodyContent';

function SearchingPage() {
    const [products, setProducts] = useState([])
    const [searchField, setSearchField] = useState("")
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${url}/products`);
                if (res.status === 200) {
                    setProducts(res.data.allProduct)
                    const results = products.filter(item =>
                        item.name.toLowerCase().includes(searchField)
                    );
                    setSearchResult(results);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getProducts();
        // eslint-disable-next-line
    }, [searchField])

    const getDate = (item) => {
        let MyDate = new Date(item);
        let MyDateString;

        MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
            + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/'
            + MyDate.getFullYear();

        return MyDateString
    }

    const meta = {
        title: "Tìm kiếm sản phẩm"
    }

    const onChangeSearchField = (e) => {
        setSearchField(e.target.value)
    }



    return (
        <div className="news">
            <DocumentMeta {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <SearchBar value={searchField} onChange={onChangeSearchField} />

            <div className="news-page">
                {searchField === "" ? (<h1 style={{ textAlign: 'center' }}>Nhập từ khóa để tìm kiếm sản phẩm!</h1>) : null}
                {searchResult.map((item) => {
                    return (
                        <Link to={`/product/${item._id}`} key={item._id}>
                            <div className="news-page-container" >
                                <div className="news-page-image">
                                    <img src={`${url}/uploads/${item.image}`} alt={item._id} />
                                </div>
                                <div className="news-page-content">
                                    <h3>{item.name}</h3>
                                    <p>{getBodyContent(item.description).slice(0, 200) + "..."}</p>
                                    <div className="news-page-date">
                                        <p>{getDate(item.createdAt)}</p>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    )
                })}
            </div>
            <Footer />
        </div>

    )
}

export default SearchingPage
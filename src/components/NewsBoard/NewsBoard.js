import React, { useState, useEffect } from "react";
import './NewsBoard.css';
import authHeader from "../../services/auth-header";
import axios from "axios";
import url from "../../setup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "../Editor/EditorToolbar";
import getBodyContent from '../DemoContent/DemoBodyContent'
import Pagination from "../Pagination/Pagination";
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button } from "react-bootstrap";

function NewsBoard({ match }) {
    const pageNumber = match.params.pageNumber || 1

    const [news, setNews] = useState([])
    const [onAdd, setOnAdd] = useState(false)
    const [onEdit, setOnEdit] = useState(false)
    const [clickedEdit, setClickedEdit] = useState(null)
    const [newsTitle, setNewsTitle] = useState("")
    const [newsBody, setNewsBody] = useState({ body: null })

    const [page, setPage] = useState(pageNumber)
    const [pages, setPages] = useState(1)
    const [, setLoading] = useState(false)

    useEffect(() => {
        const getNewsData = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${url}/news?page=${page}`);
                if (res.status === 200) {
                    setNews(res.data.news);
                    setPages(res.data.pages)
                    setLoading(false)
                }
            }
            catch (error) {
                console.log(error);
            };
        }
        getNewsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const successMess = (str) => {
        toast.success(str, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const errorMess = (str) => {
        toast.error(str, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    const onSubmitNews = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/news`,
                {
                    title: newsTitle,
                    body: JSON.stringify(newsBody)
                }
                , { headers: authHeader() })
            if (res.status === 200) {
                setNews([res.data, ...news])
                successMess("Thêm tin tức thành công!")
                setNewsTitle("")
                setNewsBody({ body: null })
                setOnAdd(!onAdd)
            }
        } catch (err) {
            console.log(err)
            errorMess("Thêm tin tức thất bại!")
        }
    }

    const onSubmitEditNews = async (id, updateNews) => {
        try {

            const res = await axios.put(`${url}/news/${id}`, {
                title: newsTitle,
                body: JSON.stringify(newsBody)
            }
                , { headers: authHeader() })

            if (res.status === 200) {
                setNews(news.map(i => (i._id === id ? updateNews : i)));
                successMess("Sửa tin tức thành công!")
            }
        }
        catch (e) {
            console.log(e)
            errorMess("Sửa tin tức thất bại!")
        }
    }

    const onDeleteNews = async (id) => {
        try {
            const res = await axios.delete(`${url}/news/${id}`, { headers: authHeader() })
            if (res.status === 200) {
                setNews(news.filter(item => item._id !== id))
                successMess("Xóa tin tức thành công!")
            }
        } catch (e) {
            console.log(e);
            errorMess("Xóa tin tức thất bại!")
        }
    }

    const onAddNews = () => {
        setNewsTitle("")
        setClickedEdit(null)
        setNewsBody({ body: null })
        setOnAdd(!onAdd)
    }

    const onEditNews = (id) => {
        setClickedEdit(id)

        news.map(item => {
            if (id === item._id) {
                setNewsTitle(item.title)
                setNewsBody(JSON.parse(item.body))
            }
            return null;
        })

        setOnEdit(!onEdit)
    }

    const onChangeNewsTitle = (e) => {
        setNewsTitle(e.target.value)
    }

    const onChangeNewsBody = newText => {
        setNewsBody({ body: newText })
    }

    const getDate = (item) => {
        let MyDate = new Date(item);
        let MyDateString;

        MyDateString = MyDate.toTimeString().substr(0, 5) + ' - ' + ('0' + MyDate.getDate()).slice(-2) + '/'
            + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/'
            + MyDate.getFullYear();

        return MyDateString
    }

    return (
        <div className="news-board">
            <ToastContainer />
            <h2 className="news-board-header-title">NEWS BOARD</h2>

            <div className="news-board-on-add-button">
                <button className="btn btn-primary" onClick={() => { onAddNews() }}>Add News</button>
            </div>

            <div className="news-board-add-form">
                <Modal show={onAdd} onHide={() => setOnAdd(!onAdd)} dialogClassName="my-modal-product">
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form onSubmit={onSubmitNews} encType='multipart/form-data'>
                                <div className="form-group-news">
                                    <label htmlFor="title">Tiêu đề</label>
                                    <input value={newsTitle} onChange={onChangeNewsTitle} className="form-control" type="text" placeholder="Title" required />

                                    <label htmlFor="body">Nội dung (<span style={{color:"red"}}>thêm ít nhất một ảnh vào nội dung*</span>)</label>
                                    <div className="text-editor">
                                        <EditorToolbar />
                                        <ReactQuill
                                            theme="snow"
                                            value={newsBody.body}
                                            onChange={onChangeNewsBody}
                                            placeholder={"Write something awesome..."}
                                            modules={modules}
                                            formats={formats}
                                        />
                                    </div>
                                </div>
                                <div className="form-group-product d-flex justify-content-end my-3">
                                    <Button className="mr-4" variant="secondary" onClick={() => setOnAdd(!onAdd)}>
                                        Đóng
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Thêm tin tức
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            <div className="news-board-title">
                <p className="news-board-content-title">Tiêu đề</p>
                <p className="news-board-content-body">Nội dung</p>
                <p className="news-board-content-date">Thời gian đăng bài</p>
                <p className="news-board-edit"><FontAwesomeIcon icon={faEdit} /></p>
                <p className="news-board-delete"><FontAwesomeIcon icon={faMinusCircle} /></p>
            </div>
            <hr style={{ marginTop: "-0.5rem" }} />

            {news.map((item) => {
                return (
                    <div key={item._id} style={{ height: "5rem" }}>
                        <div className="news-board-body border-bottom" >
                            <p className="news-board-content-title">{item.title.slice(0, 40) + "..."}</p>
                            <p className="news-board-content-body">{getBodyContent(item.body).slice(0, 60) + "..."}</p>
                            <p className="news-board-content-date">{getDate(item.updatedAt)}</p>
                            <div className="news-board-edit">
                                <button className="btn btn-success" onClick={() => onEditNews(item._id)}><FontAwesomeIcon icon={faEdit} /></button>
                            </div>
                            <div className="news-board-delete">
                                <button className="btn btn-danger" onClick={() => { if (window.confirm("Bạn muốn xóa sản phẩm này chứ ?")) onDeleteNews(item._id) }}>X</button>
                            </div>
                        </div>

                        {clickedEdit === (item._id) ? (
                            <Modal show={onEdit} onHide={() => setOnEdit(!onEdit)} dialogClassName="my-modal-product">
                                <Modal.Header closeButton>
                                    <Modal.Title>Thêm sản phẩm</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <form onSubmit={()=>onSubmitEditNews(item._id)} encType='multipart/form-data'>
                                            <div className="form-group-news">
                                                <label htmlFor="title">Tiêu đề</label>
                                                <input value={newsTitle} onChange={onChangeNewsTitle} className="form-control" type="text" placeholder="Title" required />

                                                <label htmlFor="body">Nội dung (<span style={{color:"red"}}>thêm ít nhất một ảnh vào nội dung*</span>)</label>
                                                <div className="text-editor">
                                                    <EditorToolbar />
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={newsBody.body}
                                                        onChange={onChangeNewsBody}
                                                        placeholder={"Write something awesome..."}
                                                        modules={modules}
                                                        formats={formats}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group-product d-flex justify-content-end my-3">
                                                <Button className="mr-4" variant="secondary" onClick={() => setOnEdit(!onEdit)}>
                                                    Đóng
                                                </Button>
                                                <Button variant="primary" type="submit">
                                                    Sửa tin tức
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        ) : null}

                    </div>
                )
            })}
            <div className="d-flex flex-column align-items-center">
                <div>Page {page}</div>
                <Pagination page={page} pages={pages} changePage={setPage} />
            </div>
        </div>
    );
}


export default NewsBoard;
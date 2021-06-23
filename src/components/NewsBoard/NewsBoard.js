import React, { useState, useEffect } from "react";
import './NewsBoard.css';
import authHeader from "../../services/auth-header";
import axios from "axios";
import url from "../../setup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPenAlt,
  faPlus,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import {Button} from 'react-bootstrap'
import "react-quill/dist/quill.snow.css";
import StringToHtml from '../StringToHtml/StringToHtml'
import AddNews from "../AddNews/AddNews";


const NewsBoard = (props) => {
  const limit = 11;
  const [news, setNews] = useState([]);
  const [addPop, setAddPop] = useState(false);
  const [idNewsEdit, setIdNewsEdit] = useState(null);

  const handleUpdateNews = (news) => {
      setNews(news.map(item => {
          if (idNewsEdit === item._id) return {
              ...item,
              ...news
          }
          else return item;
      }));
      setIdNewsEdit(null);
  }

  const addNews = (news) => {
      setNews([news, ...news])
  }

  const more = async () => {
      try {
          const res = await axios.get(`${url}/news?skip=${news.length}&limit=${limit}`);
          if (res.data) {
              setNews([...news, ...res.data]);
          }
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
      more();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleForm = (isOpen) => setAddPop(isOpen);

  const onAddNews = () => {
      setIdNewsEdit(null);
      toggleForm(true);
  }

  const onChangeNewsEdit = (id) => {
      setIdNewsEdit(id);
      toggleForm(true);
  }

  const onDeleteNews = async (id) => {
      try {
          const res = await axios.delete(`${url}/news/${id}`,{headers: authHeader()});
          if (res.status === 200) {
              setNews(news.filter(i => i._id !== id))
          }
      } catch (err) {
          console.log(err);
      }
  }

  return (
      <div className='postList'>
          <div className='postList-data'>

              <h1>NEWS BOARD</h1>
              <hr/>
              <div className="addButton">
                  <Button onClick={onAddNews}>
                      <FontAwesomeIcon icon={faPlus} className="iconAdd" />
                  Add
                  </Button>
                  <AddNews addNews={addNews} handleUpdateNews={handleUpdateNews} closeForm={() => toggleForm(false)} active={addPop} idNewsEdit={idNewsEdit} />
              </div>

              <div className='postTitle'>
                  <p className="titlePost">Title</p>
                  <p className="contentPost">Content</p>
                  <div className="controlPost">
                      <FontAwesomeIcon icon={faPenAlt} style={{ margin: "0 10px 0 0" }}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                  </div>

              </div>
                  {news.map(i => {

                      return (
                          <div className='postItem' key={i._id}>
                              <p className="titlePost">{i.title.substring(0, 10) + "..."}</p>
                              <p className="contentPost">{StringToHtml(i.body).slice(0,30)+"..."}</p>
                              <div className="controlPost">
                                  <span className="editPost" onClick={() => onChangeNewsEdit(i._id)}><FontAwesomeIcon icon={faEdit} /></span>
                                  <span className="deletePost" onClick={() => onDeleteNews(i._id)}><FontAwesomeIcon icon={faTimes} /></span>
                              </div>
                          </div>
                      )
                  })}

          </div>

      </div>
  );
}


export default NewsBoard;
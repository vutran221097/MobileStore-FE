import React, { useState, useEffect, useRef } from "react";
import './NewsBoard.css';
import authHeader from "../../services/auth-header";
import axios from "axios";
import url from "../../setup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faMinusCircle,
  faTrashAlt,
  faPenAlt,
  faPlus,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import {Button} from 'react-bootstrap'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import StringToHtml from '../StringToHtml/StringToHtml'
import AddNews from "../AddNews/AddNews";


// const NewsBoard = () => {
//   const [news, setNews] = useState([])
//   const [onAdd, setOnAdd] = useState(false)
//   const [onEdit, setOnEdit] = useState(false)
//   const [clickedEdit, setClickedEdit] = useState("")
//   const [newsTitle, setNewsTitle] = useState("")
//   const [newsBody, setNewsBody] = useState({ body: null })
//   const limit = 0;

//   const quillRef = useRef(null);

//   const getNewsData = async () => {
//     try {
//       const res = await axios.get(`${url}/news?skip=${news.length}&limit=${limit}`);
//       if (res.status === 200) {
//         setNews(res.data);
//         console.log(res.data)
//       }
//     }
//     catch (error) {
//       console.log(error);
//     };
//   }

//   useEffect(() => {
//     getNewsData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const onSubmitNews = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${url}/news`, {
//         title: newsTitle,
//         body: JSON.stringify(newsBody)
//       }, { headers: authHeader() })
//       if (res.status === 200) {
//         setNews([...news, res.data]);
//         setNewsTitle("")
//         setNewsBody({ body: null })
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const onDeleteNews = async (id) => {
//     try {
//       const res = await axios.delete(`${url}/news/${id}`, { headers: authHeader() })
//       if (res.status === 200) {
//         setNews(news.filter(item => item._id !== id))
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   const onAddNews = () => {
//     setOnAdd(!onAdd)

//   }

//   const onEditNews = (id) => {
//     setOnEdit(!onEdit)
//     setClickedEdit(id)
//   }

//   const onChangeNewsTitle = (e) => {
//     setNewsTitle(e.target.value)
//   }



//   const postImages = async (data) => {
//     try {
//       const res = await axios({
//         method: 'POST',
//         headers: { 'content-type': 'multipart/form-data' },
//         data: data,
//         url: `${url}/news/image`,
//       })
//       return res;

//     } catch (error) {
//       console.log(error);
//     }
//   }


//   const imageHandler = () => {
//     const editor = quillRef.current.getEditor()
//     const input = document.createElement('input');

//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       const formData = new FormData();

//       formData.append('image', file);

//       // // Save current cursor state
//       const range = editor.getSelection();

//       // // Insert temporary loading placeholder image
//       // editor.insertEmbed(range.index, 'image', `https://miro.medium.com/max/1158/1*9EBHIOzhE1XfMYoKz1JcsQ.gif`);

//       // // Move cursor to right side of image (easier to continue typing)
//       // editor.setSelection(range.index + 1);

//       try {
//         const res = await postImages(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
//         // // Remove placeholder image
//         // editor.deleteText(range.index, 1);

//         // // Insert uploaded image
//         editor.insertEmbed(range.index,'image', `${url}/${res.data.file}`);
//         // //this.quill.getEditor().insertEmbed(range.index, 'image', res);
//       } catch (error) {
//         console.log(error);
//         console.log("loi roi")
//       }
//     };
//   }

//   const format = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "align",
//     "strike",
//     "script",
//     "blockquote",
//     "background",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "color",
//     "code-block"
//   ];

//   const module ={
//     toolbar: {
//       container: [
//         ["bold"],
//         ["italic"],
//         ["underline"],
//         ["blockquote"],
//         ["code"],
//         [{ align: [] }],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ["link"],
//         ["image"],
//         ["video"],
//       ],
//       handlers: {
//         'image': imageHandler
//       }
//     }
//   }

//   const onChangeNewsBody = (newText) => {
//     setNewsBody({ body: newText })
//   }

//   return (
//     <div className="news-board">
//       <h2 className="news-board-header-title">NEWS BOARD</h2>

//       <div className="news-board-on-add-button">
//         <button className="btn btn-primary" onClick={() => { onAddNews() }}>Add News</button>
//       </div>
//       <div className="news-board-add-on-form">
//         {onAdd ? (<div>
//           <form onSubmit={onSubmitNews} encType='multipart/form-data' className="border-bottom">
//             <div className="form-group-phone">
//               {/* <label htmlFor="title">Tên</label>
//               <input value={newsTitle} onChange={onChangeNewsTitle} className="form-control" type="text" placeholder="Name" required /> */}

//               <label htmlFor="body">Content</label>

//               <div className="text-editor">
//                 <ReactQuill
//                   ref={quillRef}
//                   modules={module}
//                   formats={format}
//                   theme="snow"
//                   placeholder={"Nội dung bài viết..."}
//                   defaultValue={newsBody.body}
//                   // defaultValue={newsBody.body}
//                   onChange={onChangeNewsBody}
//                 />
//               </div>

//             </div>
//             <div className="news-board-add-button">
//               <button className="btn btn-success" type="submit">Add</button>
//             </div>

//           </form>
//         </div>) : null}
//       </div>

//       <div className="news-board-title">
//         <p className="news-board-name">Tiêu đề</p>
//         <p className="news-board-image">Nội dung</p>
//         <p className="news-board-edit"><FontAwesomeIcon icon={faEdit} /></p>
//         <p className="news-board-delete"><FontAwesomeIcon icon={faMinusCircle} /></p>
//       </div>
//       <hr style={{ marginTop: "-0.5rem" }} />


//       {news.map(item => {
//         return (

//           <div key={item._id}>
//             <div className="news-board-body border-bottom" >

//               <p className="news-board-name">{item.title}</p>
//               <div className="news-board-content-body">{StringToHtml(item.body).slice(0, 30) + "..."}</div>

//               <div className="news-board-edit">
//                 <button className="btn btn-success" onClick={() => onEditNews(item._id)}><FontAwesomeIcon icon={faEdit} /></button>
//               </div>
//               <div className="news-board-delete">
//                 <button className="btn btn-danger" onClick={() => { if (window.confirm("Bạn muốn xóa sản phẩm này chứ ?")) onDeleteNews(item._id) }}>X</button>
//               </div>
//             </div>


//             {/* {onEdit && clickedEdit === (item._id) ? (<div>
//               <form onSubmit={() => onSubmitEditNews(item._id)} encType='multipart/form-data'>
//                 <div className="form-group-phone ">
//                   <label htmlFor="name">Tên</label>
//                   <input value={newsTitle} onChange={onChangenewsTitle} className="form-control" type="text" placeholder="Name" required />

//                   <label htmlFor="body">Content</label>
//                   <input />

//                 </div>
//                 <div className="news-board-edit-button">
//                   <button className="btn btn-success" type="submit">Update</button>
//                 </div>

//               </form>
//             </div>) : null} */}

//           </div>
//         )
//       })}

//     </div>
//   );
// };

// export default NewsBoard;


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

  const getContent = (content) => {
      let parser = new DOMParser();
      let parsedDoccument = parser.parseFromString(content, "text/html");
      let contentText = parsedDoccument.getElementsByTagName("*");
      // let contentImage = parsedDoccument.getElementsByTagName("img");
      // if (contentImage[0]) console.log(contentImage[0].src)

      let demoContent = "";
      for (var i = 0; i < contentText.length; i++) {
          var current = contentText[i];
          if (
              current.children.length === 0 &&
              current.textContent.replace(/ |\n/g, "") !== ""
          ) {
              // Check the element has no children && that it is not empty
              demoContent = demoContent + " " + current.textContent;
          }
      }
      demoContent = demoContent.slice(0, 30) + "...";
      return demoContent
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
                      const contentText = getContent(i.body);
                      return (
                          <div className='postItem' key={i._id}>
                              <p className="titlePost">{i.title.substring(0, 10) + "..."}</p>
                              <p className="contentPost">{contentText}</p>
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
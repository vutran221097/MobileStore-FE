import React, { useState, useEffect } from "react";
import './ProductBoard.css'
import authHeader from "../../services/auth-header";
import axios from "axios";
import url from "../../setup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faMinusCircle,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../Editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import getBodyContent from '../DemoContent/DemoBodyContent'
import Pagination from "../Pagination/Pagination";
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button } from "react-bootstrap";

const ProductBoard = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1
  const [products, setProducts] = useState([])
  const [onAdd, setOnAdd] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [clickedEdit, setClickedEdit] = useState(null)
  const [productName, setProductName] = useState("")
  const [productImg, setProductImg] = useState(null)
  const [productCategory, setProductCategory] = useState("")
  const [productDescription, setProductDescription] = useState({ body: null })
  const [productGuarantee, setProductGuarantee] = useState("")
  const [productColor, setProductColor] = useState([])
  const [productPrice, setProductPrice] = useState("")
  const [productAvailable, setProductAvailable] = useState("")

  const [page, setPage] = useState(pageNumber)
  const [pages, setPages] = useState(1)
  const [, setLoading] = useState(false)
  const [category, setCategory] = useState("")
  const [sortByPrice, setSortByPrice] = useState("")
  const [sortByDate, setSortByDate] = useState(-1)


  useEffect(() => {
    const getProductData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${url}/products?category=${category}&page=${page}&sortByPrice=${sortByPrice}&sortByDate=${sortByDate}`);
        if (res.status === 200) {
          setProducts(res.data.products);
          setPages(res.data.pages)
          setLoading(false)
        }
      }
      catch (error) {
        console.log(error);
      };
    }
    getProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, sortByPrice, sortByDate])

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

  const onSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const bodyformData = new FormData();
      bodyformData.append("name", productName);
      bodyformData.append("image", productImg);
      bodyformData.append("category", productCategory);
      bodyformData.append("price", productPrice);
      bodyformData.append("description", JSON.stringify(productDescription));
      bodyformData.append("color", productColor)
      bodyformData.append("guarantee", productGuarantee);
      bodyformData.append("available", productAvailable);


      const res = await axios({
        method: "POST",
        headers: authHeader(),
        data: bodyformData,
        url: `${url}/products`,
      })
      if (res.status === 200) {
        setProducts([res.data, ...products]);
        successMess("Th??m s???n ph???m th??nh c??ng!")
        setOnAdd(!onAdd)
      }
    } catch (err) {
      errorMess('Th??m s???n ph???m th???t b???i!')

      console.log(err)
    }
  }

  const onSubmitEditProduct = async (id, updateProduct) => {
    try {
      const bodyformData = new FormData();
      bodyformData.append("name", productName);
      bodyformData.append("category", productCategory);
      bodyformData.append("price", productPrice);
      bodyformData.append("description", JSON.stringify(productDescription));
      bodyformData.append("color", productColor)
      bodyformData.append("guarantee", productGuarantee);
      bodyformData.append("available", productAvailable);
      bodyformData.append("image", productImg);

      const res = await axios({
        method: "PUT",
        headers: authHeader(),
        data: bodyformData,
        url: `${url}/products/${id}`,
      })

      if (res.status === 200) {
        setProducts(products.map(i => (i._id === id ? updateProduct : i)));
        successMess("S???a s???n ph???m th??nh c??ng!")
      }
    }
    catch (e) {
      console.log(e)
      errorMess('S???a s???n ph???m th???t b???i!')
    }

  }

  const onDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${url}/products/${id}`, { headers: authHeader() })
      if (res.status === 200) {
        setProducts(products.filter(item => item._id !== id))
        successMess("X??a s???n ph???m th??nh c??ng!")
      }
    } catch (e) {
      console.log(e);
      errorMess('X??a s???n ph???m th???t b???i!')
    }
  }

  const onAddProduct = () => {
    setProductName("")
    setProductImg(null)
    setProductCategory("")
    setProductDescription({ body: null })
    setProductGuarantee("")
    setProductColor([])
    setProductPrice("")
    setProductAvailable("")
    setClickedEdit(null)
    setOnAdd(!onAdd)
  }

  const onEditProduct = (id) => {
    setProductColor([])
    setClickedEdit(id)

    products.map(item => {
      if (id === item._id) {
        setProductName(item.name)
        setProductGuarantee(item.guarantee)
        setProductPrice(item.price)
        setProductDescription(JSON.parse(item.description))
      }
      return null;
    })

    setOnEdit(!onEdit)
  }

  const onChangeProductName = (e) => {
    setProductName(e.target.value)
  }

  const onChangeproductImg = (e) => {
    setProductImg(e.target.files[0])
  }

  const onChangeProductCategory = (e) => {
    setProductCategory(e.target.value)
  }

  const onChangeProductDescription = newText => {
    setProductDescription({ body: newText })
  }

  const onChangeProductGuarantee = (e) => {
    setProductGuarantee(e.target.value)
  }

  const onChangeProductColor = (e) => {
    const options = productColor
    if (e.target.checked) {
      options.push(e.target.value)
    }
    if (!e.target.checked) {
      const index = options.indexOf(e.target.value);
      if (index > -1) {
        options.splice(index, 1);
      }
    }
    setProductColor(options)
  }

  const onChangeProductPrice = (e) => {
    setProductPrice(e.target.value)
  }

  const onChangeProductAvailable = (e) => {
    setProductAvailable(e.target.value)
  }

  const onChangeCategory = (e) => {
    const filterCategory = [...products]
    setCategory(e.target.value)
    setProducts(filterCategory)
  }

  const onChangeSortByPrice = (e) => {
    const sortByPrice = [...products]
    setSortByDate("")
    setSortByPrice(parseInt(e.target.value))
    setProducts(sortByPrice)
  }

  const onChangeSortByDate = (e) => {
    const sortByDate = [...products]
    setSortByPrice("")
    setSortByDate(parseInt(e.target.value))
    setProducts(sortByDate)
  }

  const checkAvailable = (item) => {
    if (item === "available")
      return <FontAwesomeIcon className="checkAvailable" icon={faCheckCircle} alt="ok" />
    else
      return <FontAwesomeIcon className="checkUnAvailable" icon={faTimesCircle} alt="no" />
  }

  return (
    <div className="product-board">
      <ToastContainer />
      <h2 className="product-board-header-title">PRODUCT BOARD</h2>

      <div className="product-board-on-add-button">
        <button className="btn btn-primary" onClick={() => { onAddProduct() }}>Add Product</button>
      </div>

      <div className="product-board-filter">

        <div className="filter-container px-2">
          <select id="filter" className="filter-selected" value={category} onChange={onChangeCategory}>
            <option hidden>Ph??n lo???i s???n ph???m</option>
            <option value="">T???t c??? s???n ph???m</option>
            <option value="apple">??i???n tho???i Iphone</option>
            <option value="samsung">??i???n tho???i Samsung</option>
            <option value="oppo">??i???n tho???i Oppo</option>
            <option value="lg">??i???n tho???i LG</option>
            <option value="xiaomi">??i???n tho???i Xiaomi</option>
            <option value="sony">??i???n tho???i Sony</option>
            <option value="tablet">M??y t??nh b???ng</option>
            <option value="accessories">Ph??? ki???n</option>
          </select>
        </div>

        <div className="filter-container px-2">
          <select id="sortByPrice" className="filter-selected" value={sortByPrice} onChange={onChangeSortByPrice}>
            <option hidden>S???p x???p s???n ph???m theo gi??</option>
            <option value="1">Gi?? t??ng d???n</option>
            <option value="-1">Gi?? gi???m d???n</option>
          </select>
        </div>

        <div className="filter-container">
          <select id="sortByDate" className="filter-selected" value={sortByDate} onChange={onChangeSortByDate}>
            <option hidden>S???p x???p s???n ph???m theo ng??y</option>
            <option value="1">S???n ph???m c??</option>
            <option value="-1">S???n ph???m m???i</option>
          </select>
        </div>

      </div>

      <div className="product-board-add-on-form">
        <Modal show={onAdd} onHide={() => setOnAdd(!onAdd)} dialogClassName="my-modal-product">
          <Modal.Header closeButton>
            <Modal.Title>Th??m s???n ph???m</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={onSubmitProduct} encType='multipart/form-data'>
                <div className="form-group-product">
                  <label htmlFor="name">T??n</label>
                  <input value={productName} onChange={onChangeProductName} className="form-control" type="text" placeholder="Name" required />

                  <label htmlFor="image">???nh</label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="form-control"
                    name="image"
                    onChange={onChangeproductImg} required />

                  <label htmlFor="category">Nh??m</label>
                  <div id="product-board-category" value={productCategory} onChange={onChangeProductCategory}>
                    <input type="radio" name="category" className="product-board-category-add" value="apple" required />Iphone
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="samsung" /> Samsung
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="oppo" /> Oppo
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="lg" /> LG
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="xiaomi" /> Xiaomi
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="sony" /> Sony
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="tablet" /> M??y t??nh b???ng
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="accessories" /> Ph??? ki???n
                  </div>

                  <label htmlFor="description">M?? t??? (<span style={{color:"red"}}>th??m ??t nh???t m???t ???????ng d???n ???nh v??o n???i dung*</span>)</label>
                  <div className="text-editor">
                    <EditorToolbar />
                    <ReactQuill
                      theme="snow"
                      value={productDescription.body}
                      onChange={onChangeProductDescription}
                      placeholder={"Write something awesome..."}
                      modules={modules}
                      formats={formats}
                    />
                  </div>

                  <label htmlFor="guarantee">S??? th??ng b???o h??nh</label>
                  <input value={productGuarantee} onChange={onChangeProductGuarantee} className="form-control" type="number" placeholder="Guarantee" required />

                  <label htmlFor="color">M??u</label>
                  <div id="product-board-color-add">
                    <input type="checkbox" name="price" className="product-board-color-add" value="??en" onChange={onChangeProductColor} />??en
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Tr???ng" onChange={onChangeProductColor} />Tr???ng
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Xanh" onChange={onChangeProductColor} />Xanh
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="?????" onChange={onChangeProductColor} />?????
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="B???c" onChange={onChangeProductColor} />B???c
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="T??m" onChange={onChangeProductColor} />T??m
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="V??ng" onChange={onChangeProductColor} />V??ng
                  </div>

                  <label htmlFor="price">Gi??</label>
                  <input value={productPrice} onChange={onChangeProductPrice} className="form-control" type="number" placeholder="Price" required />

                  <label htmlFor="available">T??nh tr???ng</label>
                  <div id="available" value={productAvailable} onChange={onChangeProductAvailable}>
                    <input type="radio" name="status" className="product-board-status" value="available" required />C??n h??ng
                    <input type="radio" name="status" className="product-board-status ml-5" value="unavailable" />H???t h??ng
                  </div>
                </div>
                <div className="form-group-product d-flex justify-content-end">
                  <Button className="mr-4" variant="secondary" onClick={() => setOnAdd(!onAdd)}>
                    ????ng
                  </Button>
                  <Button variant="primary" type="submit">
                    Th??m s???n ph???m
                  </Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <div className="product-board-title">
        <p className="product-board-name">T??n</p>
        <p className="product-board-image">Photo</p>
        <p className="product-board-category">Nh??m</p>
        <p className="product-board-description">M?? t???</p>
        <p className="product-board-guarantee">B???o h??nh</p>
        <p className="product-board-color">M??u</p>
        <p className="product-board-price">Gi??</p>
        <p className="product-board-available">T??nh tr???ng</p>
        <p className="product-board-edit"><FontAwesomeIcon icon={faEdit} /></p>
        <p className="product-board-delete"><FontAwesomeIcon icon={faMinusCircle} /></p>
      </div>
      <hr style={{ marginTop: "-0.5rem" }} />

      {
        products.map((item) => {
          return (
            <div key={item._id}>
              <div className="product-board-body border-bottom" >
                <p className="product-board-name">{item.name}</p>
                <div className="product-board-image"><img src={`${url}/uploads/${item.image}`} alt={item._id} style={{ width: "4rem", height: "4.5rem" }} /></div>
                <p className="product-board-category">{item.category}</p>
                <p className="product-board-description">{getBodyContent(item.description).slice(0, 30) + "..."}</p>
                <p className="product-board-guarantee">{item.guarantee}<sup>th</sup></p>
                <p className="product-board-color">{item.color.toString()}</p>
                <p className="product-board-price">{item.price.toLocaleString('de-DE')}<sup>??</sup></p>
                <p className="product-board-available">{checkAvailable(item.available)}</p>
                <div className="product-board-edit">
                  <button className="btn btn-success" onClick={() => onEditProduct(item._id)}><FontAwesomeIcon icon={faEdit} /></button>
                </div>
                <div className="product-board-delete">
                  <button className="btn btn-danger" onClick={() => { if (window.confirm("B???n mu???n x??a s???n ph???m n??y ch??? ?")) onDeleteProduct(item._id) }}>X</button>
                </div>
              </div>

              {clickedEdit === (item._id) ? (<Modal show={onEdit} onHide={() => setOnEdit(!onEdit)} dialogClassName="my-modal-product">
                <Modal.Header closeButton>
                  <Modal.Title>S???a s???n ph???m</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <form onSubmit={() => onSubmitEditProduct(item._id)} encType='multipart/form-data'>
                      <div className="form-group-product">
                        <label htmlFor="name">T??n</label>
                        <input value={productName} onChange={onChangeProductName} className="form-control" type="text" placeholder="Name" required />

                        <label htmlFor="image">???nh</label>
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          className="form-control"
                          name="image"
                          onChange={onChangeproductImg} required />

                        <label htmlFor="category">Nh??m</label>
                        <div id="product-board-category" value={productCategory} onChange={onChangeProductCategory}>
                          <input type="radio" name="category" className="product-board-category-add" value="apple" required />Iphone
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="samsung" /> Samsung
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="oppo" /> Oppo
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="lg" /> LG
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="xiaomi" /> Xiaomi
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="sony" /> Sony
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="tablet" /> M??y t??nh b???ng
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="accessories" /> Ph??? ki???n
                        </div>

                        <label htmlFor="description">M?? t???</label>
                        <div className="text-editor">
                          <EditorToolbar />
                          <ReactQuill
                            theme="snow"
                            value={productDescription.body}
                            onChange={onChangeProductDescription}
                            placeholder={"Write something awesome..."}
                            modules={modules}
                            formats={formats}
                          />
                        </div>

                        <label htmlFor="guarantee">S??? th??ng b???o h??nh</label>
                        <input value={productGuarantee} onChange={onChangeProductGuarantee} className="form-control" type="number" placeholder="Guarantee" required />

                        <label htmlFor="color">M??u</label>
                        <div id="product-board-color-add">
                          <input type="checkbox" name="price" className="product-board-color-add" value="??en" onChange={onChangeProductColor} />??en
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Tr???ng" onChange={onChangeProductColor} />Tr???ng
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Xanh" onChange={onChangeProductColor} />Xanh
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="?????" onChange={onChangeProductColor} />?????
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="B???c" onChange={onChangeProductColor} />B???c
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="T??m" onChange={onChangeProductColor} />T??m
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="V??ng" onChange={onChangeProductColor} />V??ng
                        </div>

                        <label htmlFor="price">Gi??</label>
                        <input value={productPrice} onChange={onChangeProductPrice} className="form-control" type="number" placeholder="Price" required />

                        <label htmlFor="available">T??nh tr???ng</label>
                        <div id="available" value={productAvailable} onChange={onChangeProductAvailable}>
                          <input type="radio" name="status" className="product-board-status" value="available" required />C??n h??ng
                          <input type="radio" name="status" className="product-board-status ml-5" value="unavailable" />H???t h??ng
                        </div>
                      </div>
                      <div className="form-group-product d-flex justify-content-end">
                        <Button className="mr-4" variant="secondary" onClick={() => setOnEdit(!onEdit)}>
                          ????ng
                        </Button>
                        <Button variant="primary" type="submit">
                          S???a s???n ph???m
                        </Button>
                      </div>
                    </form>
                  </div>
                </Modal.Body>
              </Modal>) : null}
            </div>
          )
        })
      }
      <div className="d-flex flex-column align-items-center">
        <div>Page {page}</div>
        <Pagination page={page} pages={pages} changePage={setPage} />
      </div>
    </div >
  );
};

export default ProductBoard;
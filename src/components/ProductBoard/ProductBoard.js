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
        successMess("Thêm sản phẩm thành công!")
        setOnAdd(!onAdd)
      }
    } catch (err) {
      errorMess('Thêm sản phẩm thất bại!')

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
        successMess("Sửa sản phẩm thành công!")
      }
    }
    catch (e) {
      console.log(e)
      errorMess('Sửa sản phẩm thất bại!')
    }

  }

  const onDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${url}/products/${id}`, { headers: authHeader() })
      if (res.status === 200) {
        setProducts(products.filter(item => item._id !== id))
        successMess("Xóa sản phẩm thành công!")
      }
    } catch (e) {
      console.log(e);
      errorMess('Xóa sản phẩm thất bại!')
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
            <option hidden>Phân loại sản phẩm</option>
            <option value="">Tất cả sản phẩm</option>
            <option value="apple">Điện thoại Iphone</option>
            <option value="samsung">Điện thoại Samsung</option>
            <option value="oppo">Điện thoại Oppo</option>
            <option value="lg">Điện thoại LG</option>
            <option value="xiaomi">Điện thoại Xiaomi</option>
            <option value="sony">Điện thoại Sony</option>
            <option value="tablet">Máy tính bảng</option>
            <option value="accessories">Phụ kiện</option>
          </select>
        </div>

        <div className="filter-container px-2">
          <select id="sortByPrice" className="filter-selected" value={sortByPrice} onChange={onChangeSortByPrice}>
            <option hidden>Sắp xếp sản phẩm theo giá</option>
            <option value="1">Giá tăng dần</option>
            <option value="-1">Giá giảm dần</option>
          </select>
        </div>

        <div className="filter-container">
          <select id="sortByDate" className="filter-selected" value={sortByDate} onChange={onChangeSortByDate}>
            <option hidden>Sắp xếp sản phẩm theo ngày</option>
            <option value="1">Sản phẩm cũ</option>
            <option value="-1">Sản phẩm mới</option>
          </select>
        </div>

      </div>

      <div className="product-board-add-on-form">
        <Modal show={onAdd} onHide={() => setOnAdd(!onAdd)} dialogClassName="my-modal-product">
          <Modal.Header closeButton>
            <Modal.Title>Thêm sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={onSubmitProduct} encType='multipart/form-data'>
                <div className="form-group-product">
                  <label htmlFor="name">Tên</label>
                  <input value={productName} onChange={onChangeProductName} className="form-control" type="text" placeholder="Name" required />

                  <label htmlFor="image">Ảnh</label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="form-control"
                    name="image"
                    onChange={onChangeproductImg} required />

                  <label htmlFor="category">Nhóm</label>
                  <div id="product-board-category" value={productCategory} onChange={onChangeProductCategory}>
                    <input type="radio" name="category" className="product-board-category-add" value="apple" required />Iphone
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="samsung" /> Samsung
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="oppo" /> Oppo
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="lg" /> LG
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="xiaomi" /> Xiaomi
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="sony" /> Sony
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="tablet" /> Máy tính bảng
                    <input type="radio" name="category" className="product-board-category-add ml-4" value="accessories" /> Phụ kiện
                  </div>

                  <label htmlFor="description">Mô tả</label>
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

                  <label htmlFor="guarantee">Số tháng bảo hành</label>
                  <input value={productGuarantee} onChange={onChangeProductGuarantee} className="form-control" type="number" placeholder="Guarantee" required />

                  <label htmlFor="color">Màu</label>
                  <div id="product-board-color-add">
                    <input type="checkbox" name="price" className="product-board-color-add" value="Đen" onChange={onChangeProductColor} />Đen
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Trắng" onChange={onChangeProductColor} />Trắng
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Xanh" onChange={onChangeProductColor} />Xanh
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Đỏ" onChange={onChangeProductColor} />Đỏ
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Bạc" onChange={onChangeProductColor} />Bạc
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Tím" onChange={onChangeProductColor} />Tím
                    <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Vàng" onChange={onChangeProductColor} />Vàng
                  </div>

                  <label htmlFor="price">Giá</label>
                  <input value={productPrice} onChange={onChangeProductPrice} className="form-control" type="number" placeholder="Price" required />

                  <label htmlFor="available">Tình trạng</label>
                  <div id="available" value={productAvailable} onChange={onChangeProductAvailable}>
                    <input type="radio" name="status" className="product-board-status" value="available" required />Còn hàng
                    <input type="radio" name="status" className="product-board-status ml-5" value="unavailable" />Hết hàng
                  </div>
                </div>
                <div className="form-group-product d-flex justify-content-end">
                  <Button className="mr-4" variant="secondary" onClick={() => setOnAdd(!onAdd)}>
                    Đóng
                  </Button>
                  <Button variant="primary" type="submit">
                    Thêm sản phẩm
                  </Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <div className="product-board-title">
        <p className="product-board-name">Tên</p>
        <p className="product-board-image">Photo</p>
        <p className="product-board-category">Nhóm</p>
        <p className="product-board-description">Mô tả</p>
        <p className="product-board-guarantee">Bảo hành</p>
        <p className="product-board-color">Màu</p>
        <p className="product-board-price">Giá</p>
        <p className="product-board-available">Tình trạng</p>
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
                <p className="product-board-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>
                <p className="product-board-available">{checkAvailable(item.available)}</p>
                <div className="product-board-edit">
                  <button className="btn btn-success" onClick={() => onEditProduct(item._id)}><FontAwesomeIcon icon={faEdit} /></button>
                </div>
                <div className="product-board-delete">
                  <button className="btn btn-danger" onClick={() => { if (window.confirm("Bạn muốn xóa sản phẩm này chứ ?")) onDeleteProduct(item._id) }}>X</button>
                </div>
              </div>

              {clickedEdit === (item._id) ? (<Modal show={onEdit} onHide={() => setOnEdit(!onEdit)} dialogClassName="my-modal-product">
                <Modal.Header closeButton>
                  <Modal.Title>Sửa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <form onSubmit={() => onSubmitEditProduct(item._id)} encType='multipart/form-data'>
                      <div className="form-group-product">
                        <label htmlFor="name">Tên</label>
                        <input value={productName} onChange={onChangeProductName} className="form-control" type="text" placeholder="Name" required />

                        <label htmlFor="image">Ảnh</label>
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          className="form-control"
                          name="image"
                          onChange={onChangeproductImg} required />

                        <label htmlFor="category">Nhóm</label>
                        <div id="product-board-category" value={productCategory} onChange={onChangeProductCategory}>
                          <input type="radio" name="category" className="product-board-category-add" value="apple" required />Iphone
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="samsung" /> Samsung
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="oppo" /> Oppo
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="lg" /> LG
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="xiaomi" /> Xiaomi
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="sony" /> Sony
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="tablet" /> Máy tính bảng
                          <input type="radio" name="category" className="product-board-category-add ml-4" value="accessories" /> Phụ kiện
                        </div>

                        <label htmlFor="description">Mô tả</label>
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

                        <label htmlFor="guarantee">Số tháng bảo hành</label>
                        <input value={productGuarantee} onChange={onChangeProductGuarantee} className="form-control" type="number" placeholder="Guarantee" required />

                        <label htmlFor="color">Màu</label>
                        <div id="product-board-color-add">
                          <input type="checkbox" name="price" className="product-board-color-add" value="Đen" onChange={onChangeProductColor} />Đen
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Trắng" onChange={onChangeProductColor} />Trắng
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Xanh" onChange={onChangeProductColor} />Xanh
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Đỏ" onChange={onChangeProductColor} />Đỏ
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Bạc" onChange={onChangeProductColor} />Bạc
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Tím" onChange={onChangeProductColor} />Tím
                          <input type="checkbox" name="price" className="product-board-color-add ml-4" value="Vàng" onChange={onChangeProductColor} />Vàng
                        </div>

                        <label htmlFor="price">Giá</label>
                        <input value={productPrice} onChange={onChangeProductPrice} className="form-control" type="number" placeholder="Price" required />

                        <label htmlFor="available">Tình trạng</label>
                        <div id="available" value={productAvailable} onChange={onChangeProductAvailable}>
                          <input type="radio" name="status" className="product-board-status" value="available" required />Còn hàng
                          <input type="radio" name="status" className="product-board-status ml-5" value="unavailable" />Hết hàng
                        </div>
                      </div>
                      <div className="form-group-product d-flex justify-content-end">
                        <Button className="mr-4" variant="secondary" onClick={() => setOnEdit(!onEdit)}>
                          Đóng
                        </Button>
                        <Button variant="primary" type="submit">
                          Sửa sản phẩm
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
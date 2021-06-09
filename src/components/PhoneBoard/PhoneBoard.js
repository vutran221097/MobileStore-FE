import React, { useState, useEffect } from "react";
import './PhoneBoard.css'
import authHeader from "../../services/auth-header";
import axios from "axios";
import url from "../../setup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faMinusCircle
} from "@fortawesome/free-solid-svg-icons";

const PhoneBoard = () => {
  const [phones, setPhones] = useState([])
  const [onAdd, setOnAdd] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [clickedEdit, setClickedEdit] = useState("")
  const [phoneName, setPhoneName] = useState("")
  const [phoneImg, setPhoneImg] = useState(null)
  const [phoneCategory, setPhoneCategory] = useState("")
  const [phoneDescription, setPhoneDescription] = useState("")
  const [phoneGuarantee, setPhoneGuarantee] = useState("")
  const [phoneDetails, setPhoneDetails] = useState("")
  const [phoneColor, setPhoneColor] = useState("")
  const [phonePrice, setPhonePrice] = useState("")
  const [phoneAvailable, setPhoneAvailable] = useState("")

  const getPhoneData = async () => {
    try {
      const res = await axios.get(`${url}/phones`);
      setPhones(res.data)
    }
    catch (error) {
      console.log(error);
    };
  }

  useEffect(() => {
    getPhoneData();
  }, [])

  const onSubmitPhone = async (e) => {
    e.preventDefault();
    try {
      const bodyformData = new FormData();
      bodyformData.append("name", phoneName);
      bodyformData.append("category", phoneCategory);
      bodyformData.append("price", phonePrice);
      bodyformData.append("description", phoneDescription);
      bodyformData.append("color", phoneColor)
      bodyformData.append("guarantee", phoneGuarantee);
      bodyformData.append("details", phoneDetails);
      bodyformData.append("available", phoneAvailable);
      bodyformData.append("image", phoneImg);

      const res = await axios({
        method: "POST",
        headers: authHeader(),
        data: bodyformData,
        url: `${url}/phones`,
      })
      if (res.status === 200) {
        setPhones([...phones, res.data]);
        setPhoneName("")
        setPhoneImg(null)
        setPhoneCategory("")
        setPhoneDescription("")
        setPhoneGuarantee("")
        setPhoneDetails("")
        setPhoneColor("")
        setPhonePrice("")
        setPhoneAvailable("")
        setOnAdd(!onAdd)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onSubmitEditPhone = async (id, updatePhone) => {
    try {
      const bodyformData = new FormData();
      bodyformData.append("name", phoneName);
      bodyformData.append("category", phoneCategory);
      bodyformData.append("price", phonePrice);
      bodyformData.append("description", phoneDescription);
      bodyformData.append("color", phoneColor)
      bodyformData.append("guarantee", phoneGuarantee);
      bodyformData.append("details", phoneDetails);
      bodyformData.append("available", phoneAvailable);
      bodyformData.append("image", phoneImg);

      const res = await axios({
        method: "PUT",
        headers: authHeader(),
        data: bodyformData,
        url: `${url}/phones/${id}`,
      })

      if (res.status === 200) {
        setPhones(phones.map(i => (i._id === id ? updatePhone : i)));
      }
    }
    catch (e) {
      console.log(e)
    }

  }


  const onDeletePhone = async (id) => {
    try {
      const res = await axios.delete(`${url}/phones/${id}`, { headers: authHeader() })
      if (res.status === 200) {
        setPhones(phones.filter(item => item._id !== id))
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onAddPhone = () => {
    setOnAdd(!onAdd)
  }

  const onEditPhone = (id) => {
    setOnEdit(!onEdit)
    setClickedEdit(id)
  }

  const onChangePhoneName = (e) => {
    setPhoneName(e.target.value)
  }

  const onChangePhoneImg = (e) => {
    setPhoneImg(e.target.files[0])
  }

  const onChangePhoneCategory = (e) => {
    setPhoneCategory(e.target.value)
  }

  const onChangePhoneDescription = (e) => {
    setPhoneDescription(e.target.value)
  }

  const onChangePhoneGuarantee = (e) => {
    setPhoneGuarantee(e.target.value)
  }

  const onChangePhoneDetails = (e) => {
    setPhoneDetails(e.target.value)
  }

  const onChangePhoneColor = (e) => {
    setPhoneColor(e.target.value)
  }

  const onChangePhonePrice = (e) => {
    setPhonePrice(e.target.value)
  }

  const onChangePhoneAvailable = (e) => {
    setPhoneAvailable(e.target.value)
  }

  return (
    <div className="phone-board">
      <h2 className="phone-board-header-title">PHONE BOARD</h2>

      <div className="phone-board-add-on-button">
        <button className="btn btn-primary" onClick={() => { onAddPhone() }}>Add phone</button>
      </div>
      <div className="phone-board-add-on-form">
        {onAdd ? (<div>
          <form onSubmit={onSubmitPhone} encType='multipart/form-data'>
            <div className="form-group-phone">
              <label htmlFor="name">Tên</label>
              <input value={phoneName} onChange={onChangePhoneName} className="form-control" type="text" placeholder="Name" required />

              <label htmlFor="image">Ảnh</label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                className="form-control"
                name="image"
                onChange={onChangePhoneImg} required />

              <label htmlFor="category">Nhóm</label>
              <input value={phoneCategory} onChange={onChangePhoneCategory} className="form-control" type="text" placeholder="Category" required />

              <label htmlFor="description">Miêu tả</label>
              <textarea value={phoneDescription} onChange={onChangePhoneDescription} className="form-control" rows="4" placeholder="Description" required />

              <label htmlFor="guarantee">Số tháng bảo hành</label>
              <input value={phoneGuarantee} onChange={onChangePhoneGuarantee} className="form-control" type="number" placeholder="Guarantee" required />

              <label htmlFor="details">Thông số điện thoại</label>
              <textarea value={phoneDetails} onChange={onChangePhoneDetails} className="form-control" rows="4" placeholder="Details" required />

              <label htmlFor="color">Màu</label>
              <input value={phoneColor} onChange={onChangePhoneColor} className="form-control" type="text" placeholder="Color" required />

              <label htmlFor="price">Giá</label>
              <input value={phonePrice} onChange={onChangePhonePrice} className="form-control" type="number" placeholder="price" required />

              <label htmlFor="available">Tình trạng</label>
              <input value={phoneAvailable} onChange={onChangePhoneAvailable} className="form-control" type="text" placeholder="available" required />
            </div>

            <button className="btn btn-success" type="submit">Add</button>
          </form>
        </div>) : null}
      </div>

      <div className="phone-board-title">
        <p className="phone-board-name">Tên</p>
        <p className="phone-board-image">Photo</p>
        <p className="phone-board-category">Nhóm</p>
        <p className="phone-board-description">Mô tả</p>
        <p className="phone-board-guarantee">Bảo hành</p>
        <p className="phone-board-details">Chi tiết</p>
        <p className="phone-board-color">Màu</p>
        <p className="phone-board-price">Giá</p>
        <p className="phone-board-available">Tình trạng</p>
        <p className="phone-board-edit"><FontAwesomeIcon icon={faEdit}/></p>
        <p className="phone-board-delete"><FontAwesomeIcon icon={faMinusCircle}/></p>
      </div>

      {phones.map(item => {
        return (
          <div key={item._id}>
            <div className="phone-board-body" >
              <p className="phone-board-name">{item.name}</p>
              <div className="phone-board-image"><img src={`${url}/uploads/${item.image}`} alt={item._id} style={{ width: "4rem", height: "4.5rem" }} /></div>
              <p className="phone-board-category">{item.category}</p>
              <p className="phone-board-description">{item.description.substring(0,40) + "..."}</p>
              <p className="phone-board-guarantee">{item.guarantee}<sup>th</sup></p>
              <p className="phone-board-details">{item.details.substring(0,50) + "..."}</p>
              <p className="phone-board-color">{item.color}</p>
              <p className="phone-board-price">{item.price.toLocaleString('de-DE')}<sup>đ</sup></p>
              <p className="phone-board-available">{item.available}</p>
              <div className="phone-board-edit">
                <button className="btn btn-success" onClick={() => onEditPhone(item._id)}>Edit</button>
              </div>
              <div className="phone-board-delete">
                <button className="btn btn-danger" onClick={() => onDeletePhone(item._id)}>X</button>
              </div>
            </div>
            {onEdit && clickedEdit === (item._id) ? (<div>
              <form onSubmit={() => onSubmitEditPhone(item._id)} encType='multipart/form-data'>
                <div className="form-group-phone">
                  <label htmlFor="name">Tên</label>
                  <input value={phoneName} onChange={onChangePhoneName} className="form-control" type="text" placeholder="name" required  />

                  <label htmlFor="image">Ảnh</label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="form-control"
                    name="image"
                    onChange={onChangePhoneImg} required />

                  <label htmlFor="category">Nhóm</label>
                  <input value={phoneCategory} onChange={onChangePhoneCategory} className="form-control" type="text" placeholder="Category" required />

                  <label htmlFor="description">Mô tả</label>
                  <textarea value={phoneDescription} onChange={onChangePhoneDescription} className="form-control" rows="4" placeholder="Description" required />

                  <label htmlFor="guarantee">Số tháng bảo hành</label>
                  <input value={phoneGuarantee} onChange={onChangePhoneGuarantee} className="form-control" type="number" placeholder="Guarantee" required />

                  <label htmlFor="details">Thông số điện thoại</label>
                  <textarea value={phoneDetails} onChange={onChangePhoneDetails} className="form-control" rows="4" placeholder="Details" required />

                  <label htmlFor="color">Màu</label>
                  <input value={phoneColor} onChange={onChangePhoneColor} className="form-control" type="text" placeholder="Color" required />

                  <label htmlFor="price">Giá</label>
                  <input value={phonePrice} onChange={onChangePhonePrice} className="form-control" type="number" placeholder="price" required />

                  <label htmlFor="available">Tình trạng</label>
                  <input value={phoneAvailable} onChange={onChangePhoneAvailable} className="form-control" type="text" placeholder="available" required />
                </div>

                <button className="btn btn-success" type="submit">Update</button>
              </form>
            </div>) : null}
          </div>
        )
      })}

    </div>
  );
};

export default PhoneBoard;
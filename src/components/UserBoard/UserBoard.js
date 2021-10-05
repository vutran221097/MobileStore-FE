import React, { useState, useEffect } from "react";
import './UserBoard.css';
import authHeader from "../../services/auth-header";
import axios from "axios";
import url from "../../setup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faUserSlash,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";

const UserBoard = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([])
  const [onAdd, setOnAdd] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [clickedEdit, setClickedEdit] = useState(null)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userRoles, setUserRoles] = useState([])
  const admin_role = ["admin", "moderator"]
  const mod_role = ["moderator"]

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


  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${url}/users`, { headers: authHeader() })
        if (res.status === 200) {
          setUsers(res.data)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    getUserData();
    console.log(userRoles)
    // eslint-disable-next-line
  }, [userRoles])


  const onDeleteUser = async (id) => {
    try {
      const res = await axios.delete(`${url}/users/${id}`, { headers: authHeader() })
      if (res.status === 200) {
        setUsers(users.filter(item => item._id !== id))
        successMess("Xóa người dùng thành công!")
      }
    } catch (e) {
      console.log(e);
      errorMess('Xóa người dùng thất bại!')
    }
  }


  const onSubmitCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/users/`, {
        username: userName,
        email: userEmail,
        password: userPassword,
        roles: userRoles
      }, { headers: authHeader() })

      if (res.status === 200) {
        setUsers([res.data, ...users])
        setOnAdd(!onAdd)
        successMess("Thêm người dùng thành công!")
      }

    } catch (error) {
      console.log(error)
      errorMess('Thêm người dùng thất bại!')
    }
  }


  const onSubmitUpdateUser = async (id) => {
    try {
      const res = await axios.put(`${url}/users/${id}`, {
        username: userName,
        email: userEmail,
        password: userPassword,

      }, { headers: authHeader() })

      if (res.status === 200) {
        setUsers(users.map(i => (i._id === id)))
        setOnAdd(!onAdd)
        successMess("Sửa người dùng thành công!")
      }

    } catch (error) {
      console.log(error)
      errorMess('Sửa người dùng thất bại!')
    }
  }



  const onAddUser = () => {
    setOnAdd(!onAdd)
    setUserEmail("")
    setUserName("")
    setUserPassword("")
  }

  const onEditUser = (id) => {
    setOnEdit(!onEdit)
    setClickedEdit(id)

    users.map(item => {
      if (id === item._id) {
        setUserName(item.username)
        setUserEmail(item.email)
      }
      return null;
    })

  }

  const onChangeUserName = (e) => {
    setUserName(e.target.value)
  }
  const onChangeUserPassword = (e) => {
    setUserPassword(e.target.value)
  }
  const onChangeUserEmail = (e) => {
    setUserEmail(e.target.value)
  }
  const onChangeUserRoles = (e) => {
    if (e.target.value === "moderator") {
      setUserRoles([e.target.value])
    }
    else {
      setUserRoles(admin_role)
    }
  }



  return (
    <div className="user-board">
      <ToastContainer />
      {currentUser ? (<>
        <h2 className="user-board-header-title">USER BOARD</h2>

        <div className="user-board-on-add-button">
          <button className="btn btn-primary" onClick={() => { onAddUser() }}>Add User</button>
        </div>

        <div className="user-board-add-form">
          {onAdd ? (
            <>
              <form onSubmit={onSubmitCreateUser} className="border-bottom">
                <div className="form-group-user">

                  <label htmlFor="username">UserName</label>
                  <input value={userName} onChange={onChangeUserName} className="form-control" type="text" placeholder="Username" required />

                  <label htmlFor="email">Email</label>
                  <input value={userEmail} onChange={onChangeUserEmail} className="form-control" type="email" placeholder="Email" required />

                  <label htmlFor="password">PassWord</label>
                  <input value={userPassword} onChange={onChangeUserPassword} className="form-control" type="password" placeholder="Password" required />

                  <label htmlFor="roles">Vai trò</label>
                  <div id="roles" value={userRoles} onChange={onChangeUserRoles}>
                    <input type="radio" name="roles" className="user-board-category-add ml-4" value="admin" required /> ROLE_ADMIN
                    <input type="radio" name="roles" className="user-board-category-add ml-4" value={mod_role} /> ROLE_MODERATOR
                  </div>

                </div>

                <div className="user-board-add-button">
                  <button className="btn btn-success" type="submit">Add</button>
                </div>
              </form>
            </>
          ) : null}
        </div>
        <div className="user-board-title">
          <p className="user-board-name">UserName</p>
          <p className="user-board-email">UserEmail</p>
          <p className="user-board-password">Password</p>
          <p className="user-board-roles">Roles</p>
          <p className="user-board-edit"><FontAwesomeIcon icon={faUserEdit} /></p>
          <p className="user-board-delete"><FontAwesomeIcon icon={faUserSlash} /></p>
        </div>

        {users.map((item) => {
          return (
            <div key={item._id}>
              <div className="user-board-body">
                <p className="user-board-name">{item.username}</p>
                <p className="user-board-email">{item.email}</p>
                <p className="user-board-password">⚫⚫⚫⚫⚫⚫⚫⚫</p>
                <p className="user-board-roles">{item.roles.length === 1 ? "ROLE_MODERATOR" : "ROLE_ADMIN"}</p>
                <div className="user-board-edit">
                  <button className="btn btn-success" onClick={() => onEditUser(item._id)} ><FontAwesomeIcon icon={faEdit} /></button>
                </div>
                <div className="user-board-delete">
                  <button className="btn btn-danger" onClick={() => { if (window.confirm("Bạn muốn xóa sản phẩm này chứ ?")) onDeleteUser(item._id) }}>X</button>
                </div>
              </div>

              <div className="user-board-add-form">
                {onEdit && clickedEdit === (item._id) ? (
                  <div>
                    <form onSubmit={() => onSubmitUpdateUser(item._id)} className="border-bottom">
                      <div className="form-group-user">

                        <label htmlFor="username">UserName</label>
                        <input value={userName} onChange={onChangeUserName} className="form-control" type="text" placeholder="Username" required />

                        <label htmlFor="email">Email</label>
                        <input value={userEmail} onChange={onChangeUserEmail} className="form-control" type="email" placeholder="Email" required />

                        <label htmlFor="password">PassWord</label>
                        <input value={userPassword} onChange={onChangeUserPassword} className="form-control" type="password" placeholder="Password" required />

                        {/* <label htmlFor="roles">Vai trò</label>
                        <div id="roles" value={userRoles} onChange={onChangeUserRoles}>
                          <input type="radio" name="roles" className="user-board-category-add ml-4" value="admin" required /> ROLE_ADMIN
                          <input type="radio" name="roles" className="user-board-category-add ml-4" value={mod_role}/> ROLE_MODERATOR
                        </div> */}

                      </div>

                      <div className="user-board-add-button">
                        <button className="btn btn-success" type="submit">Update</button>
                      </div>
                    </form>

                  </div>) : null}
              </div>
              <hr />
            </div>
          )
        })}
      </>) : (<h1 style={{ textAlign: "center" }}>Bạn không có quyền truy cập vào trang này </h1>)}
    </div>
  );
};

export default UserBoard;
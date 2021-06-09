import React, { useState, useEffect } from "react";
import './UserBoard.css';
import authHeader from "../../services/auth-header";
import axios from "axios";
import url from "../../setup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faUserSlash
} from "@fortawesome/free-solid-svg-icons";

const AdminUser = () => {
  const [users, setUsers] = useState([])
  const [onAdd, setOnAdd] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [clickedEdit, setClickedEdit] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userRoles, setUserRoles] = useState([])

  // const onAddUser = () => {
  //   setOnAdd(!onAdd)
  // }

  // const onEditUser = (id) => {
  //   setOnEdit(!onEdit)
  //   setClickedEdit(id)
  // }

  const getUserData = async () => {
    try {
      const res = await axios.get(`${url}/users`, { headers: authHeader() })
      if (res.status === 200) {
        setUsers(res.data)
        console.log(res.data)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <div className="user-board">
      <h2 className="user-board-header-title">USER BOARD</h2>
      <div className="user-board-title">
        <p className="user-board-name">UserName</p>
        <p className="user-board-email">UserEmail</p>
        <p className="user-board-password">Password</p>
        <p className="user-board-roles">Roles</p>
        <p className="user-board-edit"><FontAwesomeIcon icon={faUserEdit} /></p>
        <p className="user-board-delete"><FontAwesomeIcon icon={faUserSlash} /></p>
      </div>

      {users.map(user => {
        return (
          <div key={user._id}>
            <div className="user-board-body">
              <p className="user-board-name">{user.username}</p>
              <p className="user-board-email">{user.email}</p>
              <p className="user-board-password">{user.password.substring(0, 20)}</p>
              <p className="user-board-roles">{user.roles}</p>
              <p className="user-board-edit"><FontAwesomeIcon icon={faUserEdit} /></p>
              <p className="user-board-delete"><FontAwesomeIcon icon={faUserSlash} /></p>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default AdminUser;
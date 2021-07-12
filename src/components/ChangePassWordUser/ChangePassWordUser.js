import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Button } from 'react-bootstrap'
import url from '../../setup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './ChangePassWordUser.css'

function ChangePasswordUser() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState("password")

    const onChangePassword = (e) => {
        setNewPassword(e.target.value)
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
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

    const onSubmitChangePassword = async (id) => {
        try {
            if (newPassword === confirmPassword) {
                const res = await axios.put(`${url}/users/changepassword/${id}`, {
                    password: newPassword
                })
                if (res.status === 200) {
                    setNewPassword("")
                    setConfirmPassword("")
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const onChangeHidePassword = (e) => {
        if (e.target.checked) {
            setShowPassword("text")
        }
        if (!e.target.checked) {
            setShowPassword("password")
        }
    }

    return (
        <div className="change-password">
            <ToastContainer />
            <form className="d-flex flex-column" onSubmit={() => { confirmPassword ? onSubmitChangePassword(currentUser.id) : errorMess("Bạn chưa nhập mật khẩu mới") }}>
                <h1>Đổi mật khẩu mới</h1>
                <div className="d-flex mt-4 justify-content-center">
                    <label style={{ width: "10rem" }}>
                        Nhập mật khẩu mới:
                    </label>
                    <input pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" title="*Mật khẩu phải bao gồm chữ hoa, chữ thường, số và hơn 8 kí tự." type={showPassword} placeholder="Mật khẩu mới" value={newPassword} onChange={onChangePassword} />

                </div>

                <div className="d-flex mt-4 justify-content-center">
                    <label style={{ width: "10rem" }}>
                        Xác nhận mật khẩu:
                    </label>
                    <input pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" title="*Mật khẩu phải bao gồm chữ hoa, chữ thường, số và hơn 8 kí tự." type={showPassword} placeholder="Xác nhận mật khẩu mới" value={confirmPassword} onChange={onChangeConfirmPassword} />
                </div>

                <div className="d-flex align-items-center justify-content-center">
                    <input type="checkbox" onChange={onChangeHidePassword} /> <p className="d-flex align-items-center" style={{ margin: "1rem 0 1rem 0.5rem" }}> Hiển thị mật khẩu</p>
                </div>

                {confirmPassword.length > 8 ? (newPassword === confirmPassword ? "Mật khẩu xác nhận phù hợp" : "Mật khẩu xác nhận không khớp") : null}

                <div >
                    <Button style={{ width: "50%" }} type="submit">Xác nhận</Button>
                </div>
            </form>
        </div>
    )
}

export default ChangePasswordUser
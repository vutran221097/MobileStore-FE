import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { Link } from 'react-router-dom'
import { history } from "../../helpers/history";
import logo from '../../images/branding/logo-branding.png'
import "./AdminNavbar.css"

function AdminNavbar() {
    const [showProductBoard, setShowProductBoard] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState(false);
    const [showNewsBoard, setShowNewsBoard] = useState(false);
    const [showOrderBoard, setShowOrderBoard] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showDashBoard, setShowDashBoard] = useState(false)
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowProductBoard(currentUser.roles.includes("ROLE_MODERATOR") || currentUser.roles.includes("ROLE_ADMIN"));
            setShowNewsBoard(currentUser.roles.includes("ROLE_MODERATOR") || currentUser.roles.includes("ROLE_ADMIN"));
            setShowOrderBoard(currentUser.roles.includes("ROLE_MODERATOR") || currentUser.roles.includes("ROLE_ADMIN"));
            setShowDashBoard(currentUser.roles.includes("ROLE_MODERATOR") || currentUser.roles.includes("ROLE_ADMIN"));
            setShowChangePassword(currentUser.roles.includes("ROLE_MODERATOR") || currentUser.roles.includes("ROLE_ADMIN"));
            setShowUserBoard(currentUser.roles.includes("ROLE_ADMIN"));
        }
    }, [currentUser]);

    const logOut = () => {
        setShowProductBoard(false)
        setShowUserBoard(false)
        setShowNewsBoard(false)
        setShowOrderBoard(false)
        dispatch(logout());
    };

    return (
        <nav className="admin-page-navbar navbar navbar-expand navbar-dark bg-dark">

            <div>
                <img src={logo} alt="logo" style={{ height: "10rem", width: "10rem", margin: "2rem 0" }} />
                {showDashBoard && (
                    <div className="navbar-item">
                        <Link to={"/admin/dashboard"} className="nav-link" style={{ color: "white" }}>
                            Dash Board
                        </Link>
                    </div>
                )}


                {showUserBoard && (
                    <div className="navbar-item">
                        <Link to={"/admin/userboard"} className="nav-link" style={{ color: "white" }}>
                            User Board
                        </Link>
                    </div>
                )}

                {showProductBoard && (
                    <div className="navbar-item">
                        <Link to={"/admin/productboard"} className="nav-link" style={{ color: "white" }}>
                            Product Board
                        </Link>
                    </div>
                )}

                {showNewsBoard && (
                    <div className="navbar-item">
                        <Link to={"/admin/newsboard"} className="nav-link" style={{ color: "white" }}>
                            News Board
                        </Link>
                    </div>
                )}

                {showOrderBoard && (
                    <div className="navbar-item">
                        <Link to={"/admin/orderboard"} className="nav-link" style={{ color: "white" }}>
                            Order Board
                        </Link>
                    </div>
                )}

                {showChangePassword && (
                    <div className="navbar-item">
                        <Link to={"/admin/changepassword"} className="nav-link" style={{ color: "white" }}>
                            Change Password
                        </Link>
                    </div>
                )}

            </div>



            {currentUser ? (
                <div className="navbar-nav d-flex flex-column mb-4" style={{ width: "100%" }}>
                    <li className="navbar-item">
                        <Link to="/admin/profile" className="nav-link" style={{ color: "white" }}>
                            {currentUser.username}
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/admin" className="nav-link" style={{ color: "white" }} onClick={logOut}>
                            LogOut
                        </Link>
                    </li>
                </div>
            ) : null}

        </nav>
    )
}

export default AdminNavbar
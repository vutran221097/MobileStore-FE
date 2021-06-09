import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { history } from "../../helpers/history";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import Profile from "../../components/Profile/Profile";
import UserContent from "../../components/UserContent/UserContent";
import PhoneBoard from "../../components/PhoneBoard/PhoneBoard";
import UserBoard from "../../components/UserBoard/UserBoard";


function AdminPage() {
    const [showPhoneBoard, setShowPhoneBoard] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowPhoneBoard(currentUser.roles.includes("ROLE_MODERATOR"));
            setShowUserBoard(currentUser.roles.includes("ROLE_ADMIN"));
        }
    }, [currentUser]);

    const logOut = () => {
        dispatch(logout());
    };


    return (
        <div className="admin-page">
            <BrowserRouter history={history}>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/admin"} className="navbar-brand">
                            Mobile Store Board
                        </Link>
                        <div className="navbar-nav mr-auto">
                            {showUserBoard && (
                                <li className="nav-item">
                                    <Link to={"/admin/userboard"} className="nav-link">
                                        User Board
                                    </Link>
                                </li>
                            )}

                            {showPhoneBoard && (
                                <li className="nav-item">
                                    <Link to={"/admin/phoneboard"} className="nav-link">
                                        Phone Board
                                    </Link>
                                </li>
                            )}

                            {currentUser && (
                                <li className="nav-item">
                                    <Link to={"/admin/usercontent"} className="nav-link">
                                        User
                                    </Link>
                                </li>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav d-flex justify-content-end">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/admin" className="nav-link" onClick={logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav d-flex justify-content-end">
                                <li className="nav-item">
                                    <Link to={"/admin"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}
                    </nav>

                    <div className="admin-page-body">
                        <Switch>
                            <Route exact path="/admin"  component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/profile" component={Profile} />
                            <Route path="/admin/usercontent" component={UserContent} />
                            <Route path="/admin/phoneboard" component={PhoneBoard} />
                            <Route path="/admin/userboard" component={UserBoard} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default AdminPage
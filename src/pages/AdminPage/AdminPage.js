import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { history } from "../../helpers/history";
import AdminHome from "../../components/AdminHome/AdminHome";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import Profile from "../../components/Profile/Profile";
import BoardUser from "../../components/BoardUser/BoardUser";
import BoardModerator from "../../components/BoardModerator/BoardModerator";
import BoardAdmin from "../../components/BoardAdmin/BoardAdmin";

function AdminPage() {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        }
    }, [currentUser]);

    const logOut = () => {
        dispatch(logout());
    };


    return (
        <div className="admin-page">
            <Router history={history}>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            Mobile Store Board
                        </Link>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                {/* <Link to={"/home"} className="nav-link">
                                    Home
                                </Link> */}
                            </li>
                            {showAdminBoard && (
                                <li className="nav-item">
                                    <Link to={"/adminboard"} className="nav-link">
                                        Admin Board
                                    </Link>
                                </li>
                            )}

                            {showModeratorBoard && (
                                <li className="nav-item">
                                    <Link to={"/modboard"} className="nav-link">
                                        Moderator Board
                                    </Link>
                                </li>
                            )}

                            {currentUser && (
                                <li className="nav-item">
                                    <Link to={"/userboard"} className="nav-link">
                                        User
                                    </Link>
                                </li>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
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
                            <div className="navbar-nav ml-auto">
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

                    <div className="container mt-3">
                        <Switch>
                            {/* <Route exact path={["/", "/admin"]} component={AdminHome} /> */}
                            <Route exact path={["/", "/admin"]}  component={Login} />
                            {/* <Route exact path="/login" component={Login} /> */}
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/profile" component={Profile} />
                            <Route path="/userboard" component={BoardUser} />
                            <Route path="/modboard" component={BoardModerator} />
                            <Route path="/adminboard" component={BoardAdmin} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default AdminPage
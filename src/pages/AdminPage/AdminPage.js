import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";
import './AdminPage.css'
import Login from "../../components/Login/Login";
import Profile from "../../components/Profile/Profile";
import ProductBoard from "../../components/ProductBoard/ProductBoard";
import UserBoard from "../../components/UserBoard/UserBoard";
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import NewsBoard from '../../components/NewsBoard/NewsBoard';
import Page404 from '../../components/Page404/Page404.js'
import OrderBoard from '../../components/OrderBoard/OrderBoard';
import DashBoard from '../../components/DashBoard/DashBoard';
import ChangePasswordUser from '../../components/ChangePassWordUser/ChangePassWordUser';

function AdminPage(props) {
    let match = props.match.match;

    return (
        <div className="admin-page">
                {localStorage.getItem('user') ? <AdminNavbar/> : null}
                <div className="admin-page-body">
                    <Switch>
                        <Route exact path={`${match.url}/`} component={Login} />
                        <PrivateRoute exact path={`${match.url}/dashboard`} component={DashBoard} />
                        <PrivateRoute exact path={`${match.url}/changepassword`} component={ChangePasswordUser} />
                        <PrivateRoute exact path={`${match.url}/newsboard`} component={NewsBoard} />
                        <PrivateRoute exact path={`${match.url}/newsboard/page=:pageNumber`} component={NewsBoard} />
                        <PrivateRoute exact path={`${match.url}/profile`} component={Profile} />
                        <PrivateRoute exact path={`${match.url}/productboard`} component={ProductBoard} />
                        <PrivateRoute exact path={`${match.url}/productboard/page=:pageNumber`} component={ProductBoard} />
                        <PrivateRoute exact path={`${match.url}/userboard`} component={UserBoard} />
                        <PrivateRoute exact path={`${match.url}/orderboard`} component={OrderBoard} />
                        <PrivateRoute component={Page404} />
                    </Switch>
                </div>
        </div>
    )
}

export default AdminPage
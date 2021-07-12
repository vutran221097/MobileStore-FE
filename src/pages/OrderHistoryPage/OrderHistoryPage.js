import React from 'react';
import Header from '../../components/Header/Header.js'
import Branding from '../../components/Branding/Branding.js';
import Navbar from '../../components/Navbar/Navbar.js'
import Slide from '../../components/Slide/Slide.js';
import Footer from '../../components/Footer/Footer.js';
import DocumentMeta from 'react-document-meta';
import PhoneHistoryLogin from '../../components/PhoneHistoryLogin/PhoneHistoryLogin';
import {
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoute from '../../components/PrivateRoute/PrivateRoutePhone.js';
import PhoneHistoryOrder from '../../components/PhoneHistoryOrder/PhoneHistoryOrder.js';

function OrderHistoryPage(props) {
    let match = props.match.match

    const meta = {
        title: "Lịch sử giao dịch"
    }

    return (
        <div className="order">
            <DocumentMeta {...meta} />
            <Header />
            <Branding />
            <Navbar />
            <Slide />
            <Switch>
                <Route exact path={`${match.url}/`} component={PhoneHistoryLogin} />
                <PrivateRoute exact path={`${match.url}/order`} component={PhoneHistoryOrder} />
            </Switch>
            <Footer />
        </div>

    )
}

export default OrderHistoryPage
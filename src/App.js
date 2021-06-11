import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";

import Home from './pages/HomePage/HomePage.js'
import AdminHome from './pages/AdminPage/AdminPage.js';
import PhoneBrandPage from './pages/PhoneBrandPage/PhoneBrandPage.js';
import PhoneDetailsPage from './pages/PhoneDetailsPage/PhoneDetailsPage.js';
import Cart from './pages/CartPage/CartPage.js';
import Page404 from './components/Page404/Page404.js'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/admin" component={AdminHome} />
                    <Route exact path="/brand/:category" render={(props)=> <PhoneBrandPage {...props} />} />
                    <Route exact path="/phones/:id" render={(props)=> <PhoneDetailsPage {...props} />} />
                    <Route exact path="/cart" component={Cart} />
                    <Route component={Page404} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;
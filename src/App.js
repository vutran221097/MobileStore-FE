import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from './pages/HomePage/HomePage.js'
import AdminPage from './pages/AdminPage/AdminPage.js';
import ProductsPage from './pages/ProductsPage/ProductsPage.js';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage.js';
import CartPage from './pages/CartPage/CartPage.js';
import Page404 from './components/Page404/Page404.js'
import { history } from "./helpers/history";

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/admin" render={(match) => <AdminPage match={match} />} />
                    <Route exact path="/category/:category" render={(props) => <ProductsPage {...props} />} />
                    <Route exact path="/product/:id" render={(props) => <ProductDetailsPage {...props} />} />
                    <Route exact path="/cart" component={CartPage} />
                    <Route component={Page404} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;
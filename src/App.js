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
import NewsPage from './pages/NewsPage/NewsPage'
import OrderHistory from './pages/OrderHistoryPage/OrderHistoryPage'
import Page404 from './components/Page404/Page404.js';
import NewsDetailsPage from './pages/NewsDetailsPage/NewsDetailsPage';
import SearchingPage from "./pages/SearchingPage/SearchingPage";
import { history } from "./helpers/history";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/admin" render={(match) => <AdminPage match={match} />} />
                    <Route path="/history" render={(match) => <OrderHistory match={match} />} />
                    <Route exact path="/category/:category" render={(props) => <ProductsPage {...props} />} />
                    <Route exact path="/news" component={NewsPage} />
                    <Route exact path="/product/:id" render={(props) => <ProductDetailsPage {...props} />} />
                    <Route exact path="/news/:id" render={(props) => <NewsDetailsPage {...props} />} />
                    <Route exact path="/searching" component={SearchingPage} />
                    <Route exact path="/cart" component={CartPage} />
                    <Route component={Page404} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;
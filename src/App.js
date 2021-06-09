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
import Page404 from './components/Page404/Page404.js'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/admin" component={AdminHome} />
                    <Route component={Page404} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;
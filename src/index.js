import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import './index.scss';
import App from "./components/app";
import Cart from "./components/cart";
import Footer from "./components/footer";
import rootReducers from "./reducers";
import store from "./store";

ReactDOM.render(
    <Provider store={store(rootReducers)}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/cart" component={Cart} />
                <Route component={() => (<div>404 Not found</div>)} />
            </Switch>
        </Router>
        <Footer />
    </Provider>,
    document.getElementById("root"));
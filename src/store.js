import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";

const store = applyMiddleware(promiseMiddleware)(createStore);

export default store;
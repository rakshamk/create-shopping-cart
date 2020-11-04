import { combineReducers } from "redux";
import products from "./product_reducers";

const rootReducers = combineReducers({
    products
})

export default rootReducers;
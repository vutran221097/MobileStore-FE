import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import productCart from "./cart";

export default combineReducers({
  _productCart:productCart,
  auth,
  message,
});
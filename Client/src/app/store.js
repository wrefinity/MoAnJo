import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Slicer/Auth";
import CartReducer from "../Slicer/Cart";
import CategoriesReducer from "../Slicer/Category";
import OrderReducer from "../Slicer/Order";
import productReducer from "../Slicer/Product";
import UserReducer from "../Slicer/Users";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    cart: CartReducer,
    categories: CategoriesReducer,
    orders: OrderReducer,
    products: productReducer,
    users: UserReducer,
  },
});
export default store;

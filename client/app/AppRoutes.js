import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Checkout from "../features/checkout/Checkout";
import Home from "../features/home/Home";
import Products from "../features/products/Products";
import SingleProduct from "../features/products/SingleProduct";
import ShoppingCart from "../features/shoppingCart/ShoppingCart";
import AddProduct from "../features/adminView/AddProduct";
import { me } from "./store";
import fetchUsersAsync from "../features/adminView/usersSlice";
/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(me());
    dispatch(fetchUsersAsync());
  }, []);
  console.log(users);
  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<Products />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;

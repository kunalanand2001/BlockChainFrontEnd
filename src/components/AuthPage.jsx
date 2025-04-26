import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  registerCustomer,
  registerSeller,
  loginCustomer,
  loginSeller,
} from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";

import CustomerRegister from "./CustomerRegister";
import SellerRegister from "./SellerRegister";
import CustomerLogin from "./CustomerLogin";
import SellerLogin from "./SellerLogin";
import "./AuthPage.css";

export default function AuthPage() {
  const role = useSelector((s) => s.auth.role); // 'customer' or 'seller'
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (data) => {
    const thunk = isLogin
      ? role === "customer"
        ? loginCustomer
        : loginSeller
      : role === "customer"
      ? registerCustomer
      : registerSeller;

    dispatch(thunk(data))
      .unwrap()
      .then(() => navigate("/home"))
      .catch(console.error);
  };

  return (
    <div>
      {isLogin ? (
        role === "customer" ? (
          <CustomerLogin onSubmit={handleAuth} />
        ) : (
          <SellerLogin onSubmit={handleAuth} />
        )
      ) : role === "customer" ? (
        <CustomerRegister onSubmit={handleAuth} />
      ) : (
        <SellerRegister onSubmit={handleAuth} />
      )}

      <p
        style={{
          cursor: "pointer",
          color: "blue",
          paddingLeft: "44%",
        }}
        onClick={() => setIsLogin((l) => !l)}
      >
        {isLogin ? (
          <button type="button">Need an account? Register</button>
        ) : (
          <button type="button">Have an account? Login</button>
        )}
      </p>
    </div>
  );
}

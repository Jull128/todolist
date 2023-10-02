import React from "react";
import { Link } from "react-router-dom";
import { SignUp } from "../../components/SignUp/SignUp";
import style from "./style.module.css";
import { SignIn } from "../../components/SignIn/SignIn";

const LoginPage = () => {
  return (
    <div className={style.container}>
      <SignIn />
      <div className={style.btnBox}>
        Don't have an ccount?
        <Link to={"/signup"} className={style.btn}>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

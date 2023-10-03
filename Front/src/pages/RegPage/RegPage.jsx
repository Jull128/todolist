import React from "react";
import { Link } from "react-router-dom";
import { SignUp } from "../../components/SignUp/SignUp";
import style from "./style.module.css";

const RegPage = () => {
  return (
    <div className={style.container}>
      <SignUp />
      <div className={style.btnBox}>
        Already have an ccount?
        <Link to={"/signin"} className={style.btn}>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegPage;

import React from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    // очищаем LS
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");

    // Перейти на страницу авторизации
    navigate("/signin");
  };

  return (
    <div className={style.header}>
      <button onClick={() => logOut()}>LogOut</button>
    </div>
  );
};

export default Header;

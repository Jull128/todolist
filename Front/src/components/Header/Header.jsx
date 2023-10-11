import React from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

export const Header = ({ sortTodo, sortOptions, handleSort }) => {
  const navigate = useNavigate();
  const logOut = async () => {
    // очищаем LS
    localStorage.setItem("accessToken", "");
    // Перейти на страницу авторизации
    navigate("/signin");
  };

  return (
    <div className={style.header}>
      <h1>TodoList</h1>
      <button onClick={() => logOut()} className={style.button}>
        LogOut
      </button>
    </div>
  );
};

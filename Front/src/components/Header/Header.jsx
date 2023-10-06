import React from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

export const Header = ({ sortTodo, sortOptions, handleSort }) => {
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
      <div className={style.header__select}>
        <h5>Sort By:</h5>
        <select onChange={(e) => handleSort(e)} value={sortTodo}>
          <option>Please select value</option>
          {sortOptions.map((item, index) => {
            return (
              <option className={style.text} value={item} key={index}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={() => logOut()} className={style.button}>
        LogOut
      </button>
    </div>
  );
};

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage/HomePage";

export function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      // Если токены отсутствуют, перенаправьте на страницу входа
      navigate("/signin");
    } else navigate("/home");
  }, [navigate]);

  return (
    <div className={style.container}>
      <Header />
      <Outlet />
    </div>
  );
}

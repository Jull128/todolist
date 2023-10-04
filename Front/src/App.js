import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import style from "./style.module.css";

import Header from "./components/Header/Header";
import { HomePage } from "./pages/HomePage/HomePage";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      // Если токены отсутствуют, перенаправьте на страницу входа
      navigate("/signin");
    }
  }, []);

  const path = window?.location.pathname;

  return (
    <div className={style.container}>
      <Outlet />
      <Header />
      {path === "/" && <HomePage />}
    </div>
  );
}

export default App;

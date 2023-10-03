import { Outlet, useNavigate } from "react-router-dom";

import { useEffect } from "react";

import RegPage from "./pages/RegPage/RegPage";
import style from "./style.module.css";
import HomePage from "./pages/HomePage/HomePage";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      // Если токены отсутствуют, перенаправьте на страницу входа
      navigate("/signin");
    } else {
      // Если у вас есть токены, вы можете их проверить на сервере и выполнить нужные действия
      // Например, обновить токены с помощью refresh token или получить данные пользователя
    }
  }, []);
  const path = window?.location.pathname;

  return (
    <div className={style.container}>
      <Outlet />
      {/* {path === "/" && <HomePage />} */}
    </div>
  );
}

export default App;

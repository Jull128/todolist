import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [authUser, setAuthUser] = useState(null);
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
  }, [navigate]);

  const logOut = async (e) => {
    // Сохраните полученные токены в localStorage или хранилище состояния
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");

    // Перейдите на домашнюю страницу
    navigate("/signin");
  };

  return (
    <div>
      Домашняя страница
      <button onClick={(e) => logOut(e)}>LogOut</button>
    </div>
  );
};

export default HomePage;

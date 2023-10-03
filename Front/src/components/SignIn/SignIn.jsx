import { useState } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
export const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const api = "http://localhost:3000/";

  // // Функция для симуляции запроса к серверу
  const makeAuthRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      // Сохраните полученные токены в localStorage или хранилище состояния
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Перейдите на домашнюю страницу
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={makeAuthRequest} className={style.form}>
      <h1>Welcome back!</h1>
      <div className={style.form_container}>
        <label className={style.form__label}>
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleInputChange}
            className={style.form__input}
          />
        </label>
        <label className={style.form__label}>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleInputChange}
            className={style.form__input}
          />
        </label>
        <button
          onClick={(e) => makeAuthRequest(e)}
          className={style.form__button}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

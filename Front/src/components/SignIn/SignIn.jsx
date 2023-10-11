import { useState } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils";
export const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({ statusEr: false, message: "" });
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

      // Перейти на домашнюю страницу
      if (response.ok) {
        // Сохраняем полученные токены в localStorage
        localStorage.setItem("accessToken", data.accessToken);
        navigate("/home");
      } else {
        setError({ message: data, statusEr: true });
      }
    } catch (error) {
      console.log(error);
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
        {error.statusEr === true ? (
          <p className={style.error}>{error.message}</p>
        ) : (
          ""
        )}

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

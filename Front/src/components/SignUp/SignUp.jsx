import { useState } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils";
export const SignUp = () => {
  const [policy, setPolicy] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  // // Функция для симуляции запроса к серверу
  const makeAuthRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      // Перейти на страницу авторизации
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <form className={style.form}>
      <h1>Create Account</h1>
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
            placeholder="Enter your password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            className={style.form__input}
          />
        </label>
        <div className={style.form__checkbox}>
          <input
            type="checkbox"
            value={false}
            onChange={(e) => setPolicy(e.target.value)}
          />
          <p>
            By creating an account, I agree to our Terms of use and Privacy
            Policy{" "}
          </p>
        </div>
        <button
          onClick={(e) => makeAuthRequest(e)}
          className={style.form__button}
        >
          Sign Up
        </button>
      </div>
      <div className={style.form__line}>
        <span></span>
        <p>OR</p>
        <span></span>
      </div>
    </form>
  );
};

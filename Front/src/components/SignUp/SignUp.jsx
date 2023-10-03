import { useState } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const SignUp = () => {
  const [policy, setPolicy] = useState("");
  const navigate = useNavigate();

  const api = "http://localhost:3000/";
  const [form, setForm] = useState({ email: "", password: "" });
  // const makeAuthRequest = async (data) => {
  //   console.log(data);
  //   const res = await axios.post(`${api}signup`, data);
  //   console.log(res, "res");
  // };

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

      // Перейдите на домашнюю страницу
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

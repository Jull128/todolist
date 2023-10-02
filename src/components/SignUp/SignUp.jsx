import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policy, setPolicy] = useState("");

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={signUp} className={style.form}>
      <h1>Create Account</h1>
      <div className={style.form_container}>
        <label className={style.form__label}>
          Email
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.form__input}
          />
        </label>
        <label className={style.form__label}>
          Password
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <button type="submit" className={style.form__button}>
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

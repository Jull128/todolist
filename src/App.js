import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import RegPage from "./pages/RegPage/RegPage";
import style from "./style.module.css";
import HomePage from "./pages/HomePage/HomePage";
function App() {
  const navigate = useNavigate();

  const path = window?.location.pathname;

  return (
    <div className={style.container}>
      <Outlet />
    </div>
  );
}

export default App;

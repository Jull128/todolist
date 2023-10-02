import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";
import RegPage from "./pages/RegPage/RegPage";
import style from "./style.module.css";
import HomePage from "./pages/HomePage/HomePage";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/signin");
      }
    });

    return () => {
      listen();
    };
  }, []);

  const path = window?.location.pathname;

  return (
    <div className={style.container}>
      <Outlet />
      {path === "/" && <HomePage />}
    </div>
  );
}

export default App;

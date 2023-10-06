import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage/HomePage";

function App() {
  const navigate = useNavigate();
  const initState = {
    title: "",
    description: "",
    deadline_date: "",
    deadline_time: "",
    isComplete: false,
  };
  const getLS = () => {
    let listLS = localStorage.getItem("todolist");

    if (listLS) {
      return (listLS = JSON.parse(localStorage.getItem("todolist")));
    } else return [];
  };
  const [list, setList] = useState(getLS());
  const [todo, setTodo] = useState(initState);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [sortTodo, setSortTodo] = useState("");
  const sortOptions = ["title", "deadline_date", "start"];
  const handleSort = (e) => {
    let value = e.target.value;
    setSortTodo(value);
    let sort = list.sort((a, b) => (a.value > b.value ? 1 : -1));
    setList(sort);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      // Если токены отсутствуют, перенаправьте на страницу входа
      navigate("/signin");
    }
  }, [navigate]);

  const path = window?.location.pathname;

  return (
    <div className={style.container}>
      <Header
        list={list}
        setList={setList}
        sortTodo={sortTodo}
        sortOptions={sortOptions}
        handleSort={handleSort}
      />
      <Outlet />
      {path === "/" && (
        <HomePage
          list={list}
          setList={setList}
          todo={todo}
          setTodo={setTodo}
          edit={edit}
          setEdit={setEdit}
          editID={editID}
          setEditID={setEditID}
          initState={initState}
        />
      )}
    </div>
  );
}

export default App;

/*import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Задача 1", deadline: "2022-12-31" },
    { id: 2, title: "Задача 2", deadline: "2022-12-15" },
    { id: 3, title: "Задача 3", deadline: "2022-12-20" }
  ]);

  useEffect(() => {
    todos.forEach((todo) => {
      const timeDiff = getTimeDiffInDays(todo.deadline);
      if (timeDiff <= 3) {
        showNotification(todo.title, timeDiff);
      }
    });
  }, []);

  const getTimeDiffInDays = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const showNotification = (title, timeDiff) => {
    new Notification("Срок выполнения приближается", {
      body: `Задача: ${title}\nДней до срока: ${timeDiff}`,
      icon: "/path/to/icon.png"
    });
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default TodoList; */

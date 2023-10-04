import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todolist } from "../../components/Todolist/Todolist";
import style from "./style.module.css";
export const HomePage = () => {
  const navigate = useNavigate();
  const getLS = () => {
    let listLS = localStorage.getItem("todolist");
    if (listLS) {
      return (listLS = JSON.parse(localStorage.getItem("todolist")));
    } else return [];
  };

  const initState = {
    title: "",
    description: "",
    deadline_date: "",
    deadline_time: "",
    status: false,
  };
  const [list, setList] = useState(getLS());
  const [todo, setTodo] = useState(initState);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const handleInputChange = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(list));
  }, [list]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      // Если токены отсутствуют, перенаправить на страницу входа
      navigate("/signin");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !todo.title ||
      !todo.description ||
      !todo.deadline_date ||
      !todo.deadline_time
    ) {
      //написать ошибку
      TODO: console.log("пусто");
    } else if (todo && edit) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            console.log(todo);
            console.log(item);
            return { ...todo };
          }
          return item;
        })
      );
      setTodo(initState);
      setEditID(null);
      setEdit(false);
    } else {
      let newItem = {
        id: new Date().getTime().toString(),
        title: todo.title,
        description: todo.description,
        deadline_date: todo.deadline_date,
        deadline_time: todo.deadline_time,
        status: todo.status,
      };
      let updList = [...list];
      updList.push(newItem);
      setList(updList);
      setTodo(initState);
    }
  };

  const removeItem = (id) => {
    let reducedTodo = [...list];
    let remove = reducedTodo.filter((item) => item.id !== id);
    localStorage.setItem("todolist", JSON.stringify(remove));
    setList(remove);
  };

  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    console.log(1);
    setEdit(true);
    setEditID(id);
    setTodo(editItem);

    console.log(2, editItem);
  };

  const editStatus = (id) => {
    const editStatus = list.find((item) => item.id === id);
    console.log(editStatus);
    setTodo({ ...editStatus, [editStatus.status]: true });
    console.log(todo.status);
  };

  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Name
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={todo.title}
            onChange={(e) => handleInputChange(e)}
            // className={style.form__input}
          />
        </label>
        <label
        // className={style.form__label}
        >
          Description
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={todo.description}
            onChange={(e) => handleInputChange(e)}
            // className={style.form__input}
          />
        </label>
        Deadline
        <input
          type="date"
          name="deadline_date"
          value={todo.deadline_date}
          onChange={(e) => handleInputChange(e)}
          // className={style.form__input}
        />
        <input
          type="time"
          name="deadline_time"
          value={todo.deadline_time}
          onChange={(e) => handleInputChange(e)}
          // className={style.form__input}
        />
        <button type="submit">{edit ? "Edit" : "Submit"}</button>
      </form>
      <Todolist
        list={list}
        todo={todo}
        editStatus={editStatus}
        removeItem={removeItem}
        editItem={editItem}
      />
    </div>
  );
};

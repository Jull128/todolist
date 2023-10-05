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
    isComplete: false,
  };
  const [list, setList] = useState(getLS());
  const [todo, setTodo] = useState(initState);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const handleInputChange = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const isChecked = () => {
    let listLS = JSON.parse(localStorage.getItem("todolist"));
    let checkboxes = document.getElementsByName("complete");
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      let selected = checkboxes[i].id;
      let search = listLS.find((x) => x.id === selected);
      if (search.isComplete) {
        checkboxes[i].checked = true;
      } else {
        checkboxes[i].checked = false;
      }
    }
  };

  setTimeout(() => {
    isChecked();
  }, 50);

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
        isComplete: todo.isComplete,
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

  const editStatus = (idStatus) => {
    setList(
      list.map((item) => {
        if (item.id === idStatus) {
          console.log(todo);
          console.log(item);
          return { ...item, isComplete: !item.isComplete };
        }
      })
    );
  };

  return (
    <div className={style.container}>
      <h1>TodoList</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
        <label>
          Name
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={todo.title}
            onChange={(e) => handleInputChange(e)}
            className={style.form__input}
          />
        </label>
        <label className={style.form__label}>
          Description
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={todo.description}
            onChange={(e) => handleInputChange(e)}
            className={style.form__input}
          />
        </label>
        <label className={style.form__label}>
          Deadline
          <div className={style.form__label_deadline}>
            <input
              type="text"
              name="deadline_date"
              placeholder="dd.mm.yyyy"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={todo.deadline_date}
              onChange={(e) => handleInputChange(e)}
              className={style.form__input_date}
            />
            <input
              type="time"
              name="deadline_time"
              value={todo.deadline_time}
              onChange={(e) => handleInputChange(e)}
              className={style.form__input}
            />
          </div>
        </label>
        <button type="submit" className={style.button}>
          {edit ? "Edit" : "Submit"}
        </button>
      </form>
      <div className={style.line}></div>
      <Todolist
        list={list}
        todo={todo}
        setTodo={setTodo}
        editStatus={editStatus}
        removeItem={removeItem}
        editItem={editItem}
      />
    </div>
  );
};

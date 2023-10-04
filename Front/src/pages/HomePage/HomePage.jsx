import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todolist } from "../../components/Todolist/Todolist";

export const HomePage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const initState = {
    title: "",
    description: "",
    deadline_date: "",
    deadline_time: "",
    status: false,
  };
  const [todo, setTodo] = useState(initState);

  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(false);

  const handleInputChange = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

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
      console.log("пусто");
    } else if (todo && edit) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, todo };
          }
          return item;
        })
      );
      setTodo(initState);
      setEditID(null);
      setEdit(false);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        // title: todo.title,
        // description: todo.description,
        // deadline_date: todo.deadline_date,
        // deadline_time: todo.deadline_time,
        todo,
      };
      console.log(newItem);
      let updList = [...list];
      updList.push(newItem);

      setList(updList);
      console.log(list);
      setTodo(initState);
    }
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    console.log(editItem);
    setEdit(true);
    setEditID(id);
    setTodo(editItem.todo);
  };

  return (
    <div>
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
      <Todolist list={list} removeItem={removeItem} editItem={editItem} />
    </div>
  );
};

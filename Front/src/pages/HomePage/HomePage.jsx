import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todolist } from "../../components/Todolist/Todolist";
import style from "./style.module.css";

export const HomePage = () => {
  const getLS = () => {
    let listLS = localStorage.getItem("todolist");

    if (listLS) {
      return (listLS = JSON.parse(localStorage.getItem("todolist")));
    } else return [];
  };
  const [list, setList] = useState(getLS());
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [sortTodo, setSortTodo] = useState("");
  const sortOptions = ["title", "deadline_date", "start"];

  const handleSort = (e) => {
    let list = getLS();
    let value = e.target.value;
    setSortTodo(value);
    let sort = list.sort((a, b) => (a.value > b.value ? 1 : -1));
    setList(sort);
  };

  useEffect(() => {
    console.log("wow");
    localStorage.setItem("todolist", JSON.stringify(list));
  }, [list]);

  const initState = {
    title: "",
    description: "",
    deadline_date: "",
    deadline_time: "",
    isComplete: false,
  };
  const [todo, setTodo] = useState(initState);

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const isChecked = () => {
    let listLS = localStorage.getItem("todolist");
    let checkboxes = document.getElementsByName("complete");
    if (listLS) {
      listLS = JSON.parse(localStorage.getItem("todolist"));
      for (var i = 0, n = checkboxes.length; i < n; i++) {
        let selected = checkboxes[i].id.replace("check", "");
        let search = listLS.find((x) => x.id === selected);
        if (search.isComplete) {
          checkboxes[i].checked = true;
        } else {
          checkboxes[i].checked = false;
        }
      }
    }
  };

  setTimeout(() => {
    isChecked();
  }, 10);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
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
      //      TODO:написать ошибку
      console.log("пусто");
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
      let now = new Date();
      let dd = now.getDate();
      let mm = now.getMonth();
      const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let yyyy = now.getFullYear();
      let h = now.getHours();
      let m = now.getMinutes();
      let s = now.getSeconds();
      let dataAdd =
        dd + " " + month[mm] + " " + yyyy + " " + h + ":" + m + ":" + s;
      let newItem = {
        id: new Date().getTime().toString(),
        title: todo.title,
        description: todo.description,
        deadline_date: todo.deadline_date,
        deadline_time: todo.deadline_time,
        isComplete: todo.isComplete,
        start: dataAdd,
      };
      console.log(new Date(todo.deadline_date + " " + todo.deadline_time));
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
      list.filter((todo) => {
        if (todo.id === idStatus) {
          todo.isComplete = !todo.isComplete;
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("Уведомления не поддерживаются в этом браузере");
    }

    list.forEach((todo) => {
      const timeDiff = getTimeDiffInDays(
        todo.deadline_date + "T" + todo.deadline_time
      );
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
    console.log(title, timeDiff);

    // Проверяем разрешение на отправку уведомлений
    if (Notification.permission === "granted") {
      new Notification(`Задача: ${title}\nДней до срока: ${timeDiff}`);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(`Задача: ${title}\nДней до срока: ${timeDiff}`);
        }
      });
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
          <label className={style.form__label}>
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
        <div className={style.sort_container}>
          <div className={style.line}></div>
          <div className={style.sort__select}>
            <h5>Sort By:</h5>
            <select onChange={(e) => handleSort(e)} value={sortTodo}>
              <option>Please select value</option>
              {sortOptions.map((item, index) => {
                return (
                  <option className={style.text} value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={style.line}></div>
        </div>
        <Todolist
          list={list}
          todo={todo}
          setTodo={setTodo}
          editStatus={editStatus}
          removeItem={removeItem}
          editItem={editItem}
        />
        {/* <Notification list={list} /> */}
      </div>
    </div>
  );
};

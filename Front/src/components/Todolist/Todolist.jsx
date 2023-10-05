import React from "react";
import style from "./style.module.css";
import { useEffect } from "react";
export const Todolist = ({ list, editStatus, removeItem, editItem }) => {
  return list.map((item) => {
    const id = item.id;
    const title = item.title;
    const description = item.description;
    const date = item.deadline_date;
    const time = item.deadline_time;
    const isComplete = item.isComplete;

    return (
      <div key={id} className={style.container}>
        <div className={style.todo}>
          <div className={style.todo__checkbox_container}>
            <input
              type="checkbox"
              name="complete"
              value={isComplete}
              id={`check${id}`}
              className={style.item__checkbox}
              onClick={() => editStatus(id.replace("check", ""))}
            />
            <label htmlFor={`check${id}`}></label>
          </div>
          <div className={style.todo__description}>
            <div className={style.todo__title}>
              <p
                name={`titleTodo${id}`}
                className={isComplete ? style.edit : ""}
              >
                {title}
              </p>
              <p
                name={`titleTodo${id}`}
                className={isComplete ? style.edit : ""}
              >
                {date}
              </p>
              <p
                name={`titleTodo${id}`}
                className={isComplete ? style.edit : ""}
              >
                {time}
              </p>
            </div>
            <p name="descriptionTodo">{description}</p>
          </div>
        </div>
        <div className={style.button_box}>
          <button
            className={style.button_edit}
            onClick={() => editItem(id)}
          ></button>
          <button
            className={style.button_remove}
            onClick={() => removeItem(id)}
          ></button>
        </div>
      </div>
    );
  });
};

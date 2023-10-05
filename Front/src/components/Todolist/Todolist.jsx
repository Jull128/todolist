import React from "react";
import style from "./style.module.css";
export const Todolist = ({ list, editStatus, removeItem, editItem }) => {
  return list.map((item) => {
    const id = item.id;
    const title = item.title;
    const description = item.description;
    const date = item.deadline_date;
    const time = item.deadline_time;
    const status = item.status;

    console.log("todo");

    return (
      <div key={id} className={style.container}>
        <div>
          <input
            type="checkbox"
            name="complete"
            value={status}
            id={id}
            onClick={() => editStatus(id)}
          />
          <div>
            <p>{title}</p>
            <p>{date}</p>
            <p>{time}</p>
          </div>
          <p>{description}</p>
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

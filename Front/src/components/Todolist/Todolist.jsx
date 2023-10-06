import React from "react";
import style from "./style.module.css";

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
          <div className={style.todo__section}>
            <div className={style.todo__title}>
              <p
                name={`titleTodo${id}`}
                className={isComplete ? style.title_edit : style.title}
              >
                {title}
              </p>
              <p
                name={`titleTodo${id}`}
                className={isComplete ? style.title_edit : style.title}
              >
                {date}
              </p>
              <p
                name={`titleTodo${id}`}
                className={isComplete ? style.title_edit : style.title}
              >
                {time}
              </p>
            </div>
            <p
              name="descriptionTodo"
              className={
                isComplete ? style.description_edit : style.description
              }
            >
              {description}
            </p>
            <p
              name="start"
              className={
                isComplete ? style.description_edit : style.description
              }
            >
              {item.start}
            </p>
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

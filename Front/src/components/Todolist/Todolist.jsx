import React from "react";

export const Todolist = ({ list, removeItem, editItem }) => {
  return list.map((item) => {
    const id = item.id;
    const title = item.todo.title;
    const description = item.todo.description;
    return (
      <div key={id}>
        <div>
          <input type="checkbox" />
          <p>{title}</p>
          <p>{description}</p>
        </div>
        <div>
          <button onClick={() => editItem(id)}>edit</button>
          <button onClick={() => removeItem(id)}>remove</button>
        </div>
      </div>
    );
  });
};

import React from "react";

export const Todolist = ({ list, editStatus, removeItem, editItem }) => {
  return list.map((item) => {
    const id = item.id;
    const title = item.title;
    const description = item.description;
    const status = item.status;
    // const handleEditStatus = () => {
    //   setTodo({ ...item.todo, status: !status });
    //   console.log(status);
    // };
    return (
      <div key={id}>
        <div>
          <input
            type="checkbox"
            value={status}
            onClick={() => editStatus(id)}
          />
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

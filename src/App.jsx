import React, { useState } from "react";
import { Filtering } from "./filtering";
import "./style.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editModeIsActive, setEditModeIsActive] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [editIndex, setEditIndex] = useState();
  const [filter, setFilter] = useState("all");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          text: todo.trim(),
          id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
          status: "inactive",
        },
      ]);
      setTodo("");
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editTodo === "") {
      handleDelete(editIndex);
    } else {
      setTodos(
        todos.map((entry, index) => {
          if (index === editIndex) {
            return { text: editTodo, id: entry.id, status: entry.status };
          } else return entry;
        })
      );
      setEditModeIsActive(false);
    }
  };

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEditTodo = (e) => {
    setEditTodo(e.target.value);
  };

  const handleEditMode = (index) => {
    console.log(todos);
    setEditTodo(todos[index].text);
    setEditIndex(index);
    setEditModeIsActive(true);
  };

  const handleDelete = (index) => {
    setTodos(
      todos.filter((_todo, indexTodos) => {
        return indexTodos !== index;
      })
    );
    setEditModeIsActive(false);
  };

  const handleOptionSelect = (e, idEvent) => {
    e.preventDefault();
    setTodos(
      todos.map((entry) => {
        return entry.id === idEvent
          ? { text: entry.text, id: entry.id, status: e.target.value }
          : entry;
      })
    );
  };

  const filterOptions = [
    { value: "all", text: "全て" },
    { value: "inactive", text: "着手予定" },
    { value: "incomplete", text: "着手" },
    { value: "complete", text: "完了" },
  ];

  return (
    <div className="App">
      <h1>Todo List</h1>
      {editModeIsActive === false && (
        <form onSubmit={handleFormSubmit}>
          <input
            className="addtodotext"
            name="todo"
            type="text"
            placeholder="Todoを入力"
            value={todo}
            onChange={handleInputChange}
          />
          <input name="submit" type="submit" value="追加" className="button" />
          <select
            className="selector"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterOptions.map((option) => (
              <option key={option.text} value={option.value}>
                {option.text}
              </option>
            ))}
            {/* <option value="all">全て</option>
            <option value="inactive">着手予定</option>
            <option value="incomplete">着手</option>
            <option value="complete">完了</option> */}
          </select>
        </form>
      )}
      {editModeIsActive && (
        <form onSubmit={handleEditSubmit}>
          <input
            name="editTodo"
            type="text"
            value={editTodo}
            onChange={handleEditTodo}
          />
          <input name="submit" type="submit" value="完了" className="button" />{" "}
          <Filtering filter={filter} setFilter={setFilter} />
          {/* <select className='selector' value={filter} onChange={(e) =>setFilter(e.target.value)}>
            <option value="all">全て</option>
            <option value="inactive">着手予定</option>
            <option value="incomplete">着手</option>
            <option value="complete">完了</option>
          </select> */}
        </form>
      )}
      <ul className="todo-list">
        {todos.map(
          (todo, index) =>
            (todo.status === filter || filter === "all") && (
              <li key={todo.id}>
                <span className="todo-text">{todo.text}</span>
                <select
                  className="selector"
                  value={todo.status}
                  onChange={(e) => handleOptionSelect(e, todo.id)}
                >
                  <option value="inactive">着手予定</option>
                  <option value="incomplete">着手</option>
                  <option value="complete">完了</option>
                </select>
                <button
                  className="button"
                  onClick={() => handleEditMode(index)}
                >
                  編集
                </button>
                <button className="button" onClick={() => handleDelete(index)}>
                  削除
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

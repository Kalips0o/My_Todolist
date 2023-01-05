import React from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

function App() {
  let task1: Array<TaskType> = [
    { id: 1, title: "HTML", isDone: true },
    { id: 2, title: "CSS", isDone: true },
    { id: 3, title: "JS", isDone: false },
  ];
  let task2: Array<TaskType> = [
    {
      id: 1,
      title: "Terminator",
      isDone: true,
    },
    { id: 2, title: "One at house", isDone: false },
    { id: 3, title: "Blablabla", isDone: false },
  ];

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={task1} />
      <Todolist title="Movies" tasks={task2} />
    </div>
  );
}

export default App;

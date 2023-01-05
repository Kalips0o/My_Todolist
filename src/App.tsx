import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: false},
        {id: 4, title: "React", isDone: false},
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let taskForTodolist = tasks;
    if (filter === "completed") {
        taskForTodolist = tasks.filter((t) => t.isDone === true);
    }
    if (filter === "active") {
        taskForTodolist = tasks.filter((t) => t.isDone === false);
    }

    function removeTask(id: number) {
        let filterTasks = tasks.filter((t) => t.id !== id);
        setTasks(filterTasks);
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

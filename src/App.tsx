import React, {useState} from 'react';
import './App.css';
import {tasksPropsType, Todolist} from "./Todolist";

export type filterValuesType = "all" | "active" | "completed"


function App() {
    const [tasks, setTasks] = useState<Array<tasksPropsType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "redux", isDone: false},
        {id: 5, title: "angular js", isDone: true},
        {id: 6, title: "Git", isDone: true},
    ])


    const removeTask = (taskID: number): void => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }

    const [filter, setFilter] = useState<filterValuesType>("all")

    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone === true);
            break
        case "active":
            tasksForRender = tasks.filter(t => t.isDone === false)
            break
        default:
            tasksForRender = tasks;
    }
    const changeFilter = (filter: filterValuesType) =>
        setFilter(filter)

    //UI:
    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForRender}
                removeTasks={removeTask}
                changeFilter={changeFilter}
            />

        </div>

    );
}

export default App;

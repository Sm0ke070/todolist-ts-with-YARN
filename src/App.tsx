import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {tasksPropsType, Todolist} from "./Todolist";

export type filterValuesType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<tasksPropsType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: true},
        {id: v1(), title: "redux", isDone: false},
        {id: v1(), title: "Git", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
    ])
    console.log(tasks)


    const onChangeIsDone = (newId: string, value: boolean) => {
        setTasks(tasks.map(el => el.id === newId ? {...el, isDone: value} : el))
        console.log(value)
    }

    const removeTask = (taskID: string): void => {
        setTasks(tasks.filter((task: tasksPropsType) => task.id !== taskID))
    }

    const addTask = (title: string) => {
        const newTask: tasksPropsType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const updatedTask = [newTask, ...tasks]
        setTasks(updatedTask)
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


    return (
        <div className="App">
            <Todolist
                filter={filter}
                onChangeIsDone={onChangeIsDone}
                title={"What to learn"}
                tasks={tasksForRender}
                removeTasks={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />

        </div>

    );
}

export default App;

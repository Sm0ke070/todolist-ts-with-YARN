import React from "react";
import {filterValuesType} from "./App";

type TodolistPropsType = {
    title: string;
    tasks: Array<tasksPropsType>;
    removeTasks: (taskID: number) => void;
    changeFilter: (filter: filterValuesType) => void;
}
export type tasksPropsType = {
    id: number
    title: string
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {
    const tasksListItems = props.tasks.map(tasks => {
        const removeTask = () => props.removeTasks(tasks.id);
        return (
            <li><input type="checkbox" checked={tasks.isDone}/>
                <span>{tasks.title}</span>
                <button onClick={removeTask}> x
                </button>
            </li>

        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>

                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksListItems}

                    {/*{props.tasks.map(el=>{
                        return(
                            <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
                        )
                    })}*/}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter("all")}>All</button>
                    <button onClick={() =>props.changeFilter("active")}> Active</button>
                    <button onClick={()=> props.changeFilter("completed")}> Completed</button>
                </div>
            </div>

        </div>

    )
}

import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType} from "./App";

type TodolistPropsType = {
    title: string;
    tasks: Array<tasksPropsType>;
    removeTasks: (taskID: string) => void;
    changeFilter: (filter: filterValuesType) => void;
    addTask: (title: string) => void;
    onChangeIsDone: (newId: string, value: boolean) => void;
}
export type tasksPropsType = {
    id: string;
    title: string;
    isDone: boolean;
}

export const Todolist = (props: TodolistPropsType) => {

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTask)
            setNewTask("")
        }
    }
    const addTask = () => {
        props.addTask(newTask)
        setNewTask("")
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    const [newTask, setNewTask] = useState()

    const tasksListItems = props.tasks.map(t => {
            const onRemoveHandler = () => props.removeTasks(t.id);
            const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                props.onChangeIsDone(t.id, event.currentTarget.checked)
            }
            return (
                <li><input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                    <span>{t.title}</span>
                    <button onClick={onRemoveHandler}> x
                    </button>
                </li>
            )
        }
    )
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTask}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
                </div>
                <ul>
                    {tasksListItems}
                </ul>

            </div>

        </div>

    )
}

import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType} from "./App";
import style from './Todolist.module.css'

type TodolistPropsType = {
    filter: filterValuesType;
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
    const [title, setTitle] = useState()
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle("")
        } else setError('Title is required')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(title)
            setTitle("")
        }
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")
    const onChangeHandlerForCheckBox = (tID: string, checkBoxValue: boolean) => {
        props.onChangeIsDone(tID, checkBoxValue)
    }
    const tasksListItems = props.tasks.map(t => {

            const onClickHandler = () => props.removeTasks(t.id);

            /*const onChangeHandlerForCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
                props.onChangeIsDone(t.id, event.currentTarget.checked)
            }*/

            return (
                <li key={t.id} className={t.isDone ? style.isDone : ''}>
                    <input type="checkbox" checked={t.isDone}
                           onChange={(event) => onChangeHandlerForCheckBox(t.id, event.currentTarget.checked)}/>
                    <span>{t.title}</span>
                    <button onClick={onClickHandler}> x
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
                    className={error ? style.error : ''}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={style.errorMessage}>{error}</div>}
                <ul>
                    {tasksListItems}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? style.activeFilter : ''}
                            onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter === 'active' ? style.activeFilter : ''}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter === 'completed' ? style.activeFilter : ''}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>

        </div>

    )
}

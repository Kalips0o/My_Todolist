import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useActions, useAppSelector } from '../../common/hooks/hooks';
import { todolistsActions } from './Todolist';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../Login/authSelectors';
import { selectTodolists } from './Todolist/todolistSelectors';
import { Todolist } from './Todolist/Todolist';
import { AddItemForm } from '../../common/components/AddItemForm/AddItemForm';
import styles from './Todolist.module.css';

type TodolistsListPropsType = {
    demo?: boolean;
};

export const TodolistsList: FC<TodolistsListPropsType> = ({ demo = false }) => {
    const todolists = useAppSelector(selectTodolists);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const { fetchTodolists, addTodolist } = useActions(todolistsActions);

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        todolists.length === 0 && fetchTodolists();
    }, [todolists.length, fetchTodolists, demo, isLoggedIn]);

    const addTodolistHandler = useCallback((todolistTitle: string) => {
        addTodolist(todolistTitle);
    }, [addTodolist]);

    const rowsOfTodolists = useMemo(() => {
        const rows = [];
        for (let i = 0; i < todolists.length; i += 4) {
            rows.push(todolists.slice(i, i + 4));
        }
        return rows;
    }, [todolists]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />;
    }

    return (
        <div className={styles.container}>
            <AddItemForm addItem={addTodolistHandler} />
            <div className={styles.tl}>
                {rowsOfTodolists.map((row, index) => (
                    <div key={index} className={styles.row}>
                        {row.map((tl) => (
                            <div key={tl.id} className={styles.wrap}>
                                <Todolist todolist={tl} demo={demo} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

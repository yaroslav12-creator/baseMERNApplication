import React, { useState, useEffect } from 'react';

import { Todo } from './todo-component-func';
import { getAllTodos, removeTodo } from '../requests/index.js';

export const TodosList  = (props) => {
    
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getAllTodos()
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => {
                console.log('Error:\n', error);
            });
    }, []);

    // useEffect(() => {
    //     getAllTodos()
    //         .then((response) => {
    //                 setTodos(response.data);
    //         })
    //         .catch((error) => {
    //             console.log('Error:\n', error);
    //         });
    // }, [todos]);

    const onDelete = (id) => {
        removeTodo(id)
            .catch((error) => {
                console.log('Error:\n', error);
            });
        setTodos([...todos].filter((todo) => id !== todo.id))
    };

    const todoList = () => {
        return todos.map((currentTodo, i) => {
            return <Todo onDelete={onDelete} todo={currentTodo} key={i} />;
        })
    };
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { todoList() }
                    </tbody>
                </table>
            </div>
        );
}

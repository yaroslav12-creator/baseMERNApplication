import React, { useState, useEffect } from 'react';

import { getTodoById } from '../requests';
import { updateTodo } from '../requests/index';

export const EditTodo = (props) => {
    const [todo, setTodo] = useState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
    })

    useEffect(() => {
        getTodoById(props.match.params.id)
        .then((response) => {
            setTodo({
                todo_description: response.data.todo_description,
                todo_responsible: response.data.todo_responsible,
                todo_priority: response.data.todo_priority,
                todo_completed: response.data.todo_completed
            })   
        })
        .catch((error) => {
            console.log(error);
        })
    }, [props.match.params.id]);

    const onChangeTodoDescription = (e) => {
        setTodo({
            ...todo,
            todo_description: e.target.value
        });
    }

    const onChangeTodoResponsible = (e) => {
        setTodo({
            ...todo,
            todo_responsible: e.target.value
        });
    }

    const onChangeTodoPriority = (e) =>{
        setTodo({
            ...todo,
            todo_priority: e.target.value
        });
    }

    const onChangeTodoCompleted = (e) => {
        setTodo({
            ...todo,
            todo_completed: !todo.todo_completed
        });
    }

    const onCancelEdit = (e) => {
        props.history.goBack();
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const obj = {
            todo_description: todo.todo_description,
            todo_responsible: todo.todo_responsible,
            todo_priority: todo.todo_priority,
            todo_completed: todo.todo_completed
        };
        updateTodo(props.match.params.id, obj)
        
        props.history.push('/');
    }

        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={todo.todo_description}
                                onChange={onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={todo.todo_responsible}
                                onChange={onChangeTodoResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={todo.todo_priority==='Low'} 
                                    onChange={onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={todo.todo_priority==='Medium'} 
                                    onChange={onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={todo.todo_priority==='High'} 
                                    onChange={onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={onChangeTodoCompleted}
                                checked={todo.todo_completed}
                                value={todo.todo_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                        <input 
                            type="button" 
                            value="Cancel Edit" 
                            onClick={onCancelEdit} 
                            className="btn btn-warning" 
                            style={{marginLeft: '20px', color: 'white', textDecoration: 'none'}}/>
                    </div>
                </form>
            </div>
        );
}

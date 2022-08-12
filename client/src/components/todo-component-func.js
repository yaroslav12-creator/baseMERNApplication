import React from 'react';
import { Link } from 'react-router-dom';

export const Todo = (props) => {
        return (
            <tr>
                <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
                <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
                <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
                <td>
                    <Link to={"/edit/"+props.todo.id}>
                        <button style={{color: 'white', textDecoration: 'none'}} type="button" className="btn btn-warning">
                            Edit
                        </button>
                    </Link> 
                    <button 
                        style={{marginLeft: '20px'}}  
                        type="submit"
                        className="btn btn-danger"
                        onClick={() => props.onDelete(props.todo.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )
    };

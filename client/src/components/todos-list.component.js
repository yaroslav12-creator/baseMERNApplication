import React, { Component } from 'react';
import axios from 'axios';

import { Todo } from './todo.js';

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch((error) => {
                console.log('Error:\n', error);
            });
    }

    componentDidUpdate() {
        axios.get('http://localhost:5000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch((error) => {
                console.log('Error:\n', error);
            });
    }

    todoList() {
        return this.state.todos.map((currentTodo) => {
            return <Todo todo={currentTodo} key={currentTodo.id} />;
        })
    }
    
    render() {
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
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

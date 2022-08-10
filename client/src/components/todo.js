import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export class Todo extends Component {
    constructor(props) {
        super(props);

        this.onClickDelete = this.onClickDelete.bind(this);
    }


    onClickDelete = () => {
        axios.delete('http://localhost:5000/todos/delete/'+this.props.todo.id)
            .catch((error) => {
                console.log('Error:\n', error);
            });
        // this.props.history.goBack();
        // this.forceUpdate();
    }
    render() {
        return (
            <tr>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_description}</td>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_responsible}</td>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_priority}</td>
                <td>
                    <Link to={"/edit/"+this.props.todo.id}>
                        <button style={{color: 'white', textDecoration: 'none'}} type="button" className="btn btn-warning">
                            Edit
                        </button>
                    </Link> 
                    <input 
                        style={{marginLeft: '20px'}} 
                        type="button" 
                        value="Delete" 
                        className="btn btn-danger"
                        onClick={this.onClickDelete}
                    />
                </td>
            </tr>
        )
    };
}
import axios from 'axios';

export const getAllTodos = () => {
    return axios.get('http://localhost:5000/todos/');
};

export const getTodoById = (id) => {
    return axios.get('http://localhost:5000/todos/'+id);
};

export const removeTodo = (id) => {
    return axios.delete('http://localhost:5000/todos/delete/'+id);
};

export const createTodo = (todo) => {
    return axios.post('http://localhost:5000/todos/add', todo);
};

export const updateTodo = (id, todo) => {
    return axios.post('http://localhost:5000/todos/update/'+id, todo);
};
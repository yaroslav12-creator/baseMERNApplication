const express = require('express');
const Todo = require('../Model.js');

const todoRoutes = express.Router();

todoRoutes.route('/').get(async (req, res) => {
    try {
        await Todo.findAll({raw: true}).then(todos => {
            if(todos) {
                res.json(todos);
            } else {
                res.json({message: 'No todos yet'});
            }
        });
    } catch (error) {
        console.log('Error while finding all todos');
    }
});

todoRoutes.route('/:id').get(async(req, res) => {
    try {
        const id = req.params.id;
        
        const todo = await Todo.findOne({ where: { id } });
        if(todo) {
            res.json(todo);
        }
        else {
            res.status(404).json('Not found');
        }
    } catch (error) {
        console.log('Error while finding todo by id:\n', error);
    }
});

todoRoutes.route('/add').post(async (req, res) => {
    try {
        let todo = req.body;
        console.log(req.body)

        Todo.create(todo)
            .then(todo => {
                res.status(200).json({todo});
            })
            .catch(err => {
                res.status(400).send('adding new todo failed');
                // console.log(err);
            });
    } catch (error) {
        console.log("Error while adding new todo:\n", error);
    } 
});

todoRoutes.route('/update/:id').post(async (req, res) => {
    try {
        let id = req.params.id;
        const updatedTodo = req.body;
    
        await Todo.update(updatedTodo, { where: { id } });
        res.json({ updatedTodo });
    } catch (error) {
        console.log("Error while updating:\n", error);
    }
    
    // await Todo.findOne(req.params.id, async (err, todo) => {
    //     if (!todo) {
    //         res.status(404).send("data is not found");
    //         console.log('Error while finding todo by id: \n', err);
    //     }
    //     else {
    //         todo.todo_description = updatedTodo.todo_description;
    //         todo.todo_responsible = updatedTodo.todo_responsible;
    //         todo.todo_priority = updatedTodo.todo_priority;
    //         todo.todo_completed = updatedTodo.todo_completed;
    //         await Todo.update(todo, { where: { id } }).then(todo => {
    //             res.json('Todo updated!');
    //         })
    //         .catch(err => {
    //             res.status(400).send("Update not possible");
    //         });
    //     }
    // });
});

todoRoutes.delete('/delete/:id', async(req, res) => {
    try {
        let id = req.params.id;
        await Todo.destroy({ where: { id } });
        res.json({ message: `Todo with id: ${id} was deleted` });
    } catch (error) {
        console.log("Error while deleting:\n", error);
    }
});

module.exports = todoRoutes;

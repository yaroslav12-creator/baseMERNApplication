const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    post: process.env.DB_PORT,
  });

const Todo = sequelize.define("todo", {
    todo_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    todo_responsible: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    todo_priority: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    todo_completed: {
        type: DataTypes.BOOLEAN,
    },
});

sequelize.sync().then((result) => {
    // console.log(result);
}).catch(err => {
     console.log("Error:\n", err);
});

module.exports = Todo;

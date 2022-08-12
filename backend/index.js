require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { Client, Pool } = require('pg');

const todoRoutes = require('./routes/index.js');

const app = express();

const PORT = process.env.SEVER_PORT || 5001;

app.use(cors());
app.use(express.json());

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});
// const pool = new Pool();    


app.use('/todos', todoRoutes);
    
client.connect((err) => {
    if(err) {
        throw err;
    } else {
        console.log('Successfuly connected to postgres');
    }
});

// pool.connect((err, client, release) => {
//     if(err) throw err;
//     if(client) client.release();
//     return;
// }) 
         
app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
});

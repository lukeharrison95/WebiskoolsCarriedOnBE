const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const { port } = require('./config/config.json');

const app = express();

mongoose
    .connect('mongodb://localhost:27017/quiz-users', 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => {
        console.log('Connected to the Database successfully');
    });

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/quizmaster', routes)

app.listen(port, () => {
    console.log('server is running on port ' +  port)
});
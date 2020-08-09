const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');


//Routes
const users = require('./routes/api/UserRoutes');
const todos = require('./routes/api/TodoRoutes');
const login = require('./routes/api/LoginRoutes');



const port = 8080;
const app = express();

//body parser middle ware
app.use(parser.json())

//Enable CORS
app.use(cors())

//DB config
const dbConnection = require('./config/keys').mongoURI;

//connect to mongoose
mongoose
    .connect(dbConnection, { useUnifiedTopology: true,  useNewUrlParser: true })
    .then(() => console.log('Connected'))
    .catch(err => console.log(err));

// use routes
app.use('/api/users', users);
app.use('/api/todos', todos );
app.use('/api/login', login);

app.listen(port)

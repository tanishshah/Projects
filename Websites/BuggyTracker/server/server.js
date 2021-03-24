//Tanish Shah

//Imports
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/apiKey').DB;
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
const bugRoute = require('./routes/bugRoute');

app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
app.use(cors());
//connect to db
mongoose.connect(db,{ useUnifiedTopology: true , useNewUrlParser: true}, ()=>console.log('connected'));

app.use('/bugs',bugRoute);
app.listen(port);
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, listening)
function listening(){
    console.log("server is running");
    console.log(`server running at port: ${port}`);
}

//get all data
app.get('/all', returnAllData)

function returnAllData(req, res){
    res.send(projectData);
    console.log(projectData)
}

//post user entered data, date and api respond(temp)
app.post('/addData', recievingData);

function recievingData(req, res){
    const newEntry = {
        name: req.body.name,
        date: req.body.date,
        temp: req.body.temp,
        feelings: req.body.feelings,
    };
    projectData = newEntry;
    res.send(projectData);
    console.log("Data recieved successfully");
}
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const port = 3000;

app.use(cors());
app.use('/',express.static('public'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const mongoose = require('mongoose')
const budgetModel = require('./model/myschema')



let url = 'mongodb://127.0.0.1:27017/personal_budget';


app.get("/budget", (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            budgetModel.find({})
                .then((data) => {
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((Error) => {
                    console.log(Error);
                })
        })
        .catch((Error) => {
            console.log(Error);
        })
})

app.post("/addNewBudget", (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {

            let budgetData = new budgetModel(req.body);
            budgetModel.insertMany(budgetData)
            .then((data)=>{

                res.send("Data Inserted...")
                mongoose.connection.close();
            })
            .catch((Error)=>{
                res.send(Error.message)
            })
        })
        .catch((Error) => {
            res.send(Error);
        })
})


app.get('/hello', (req,res) => {
    res.send('Hello World!');
});

app.listen(port,()=>{
    console.log(`API is running on port ${port}`);
});
const mongoose = require('mongoose')
const budgetModel = require('./model/myschema')


let url = 'mongodb://127.0.0.1:27017/personal_budget';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    budgetModel.find({})
    .then((data)=>{
        console.log(data);
        mongoose.connection.close();
    })
    .catch((Error)=>{
        console.log(Error)
    })
})
.catch((Error)=>{
    console.log(Error);
})

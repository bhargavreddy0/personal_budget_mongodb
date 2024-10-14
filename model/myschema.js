const mongoose = require('mongoose')

const mySchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },
    budget:{
        type:Number,
        required:true
    },
    color:{
        type:"String",
        validate: {
            validator: function(value) {
              return /^#([A-Fa-f0-9]{6})$/.test(value);
            },
            message: 'Color code should be in hexadecimal'
        },
        required:true,
        trim:true,
        uppercase:true
    }
},{collection:'budget'})

module.exports = mongoose.model('budget',mySchema)
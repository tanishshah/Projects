//Imports
const mongoose = require('mongoose');

//scehma for entries
const personSchema = mongoose.Schema({
    longitude:{
        type: Number,
        required: true
    },
    lattitude:{
        type:Number,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    mail:{
        type:String,
        required: true
    },
    vaccinated:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: false
    },
    income:{
        type:Number,
        required: false
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

//Exports
Person = mongoose.model('Person',personSchema);
module.exports = Person;
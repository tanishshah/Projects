//Imports
const mongoose = require('mongoose');

//The schema for the bugs
const bugSchema = mongoose.Schema({
    issue:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    priority:{
        type: Number,
        required: true,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

//Exports
Bugs = mongoose.model('Bugs',bugSchema);
module.exports = Bugs;
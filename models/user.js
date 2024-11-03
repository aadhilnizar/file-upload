const mongoose = require('mongoose');
const validator = require('validator')

const SignupScehema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
    }
    },
    password: {
        type: String
    }
})


const collection = new mongoose.model("users",SignupScehema);
module.exports = collection;
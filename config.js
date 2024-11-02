const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/upload");
const validator = require('validator')
//check connection
connect.then(()=>{
    console.log("Database is connected")
})
.catch(()=>{
    console.log("Database cant be connected")
})

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
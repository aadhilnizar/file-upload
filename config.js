const mongoose = require('mongoose')
async function connectMongoDb(url) {
    return mongoose.connect(url);
}


//check connection
connect.then(()=>{
    console.log("Database is connected")
})
.catch(()=>{
    console.log("Database cant be connected")
})


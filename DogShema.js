const mongoose = require("mongoose")

const DogSchema = mongoose.Schema({
    nameOficial:{
        type: String,
        require: true
    },
    secondaryName:{
        type: String,
        require: true
    },
    size:{
        type: String,
        require: true
    },
    country:{
        type: String,
        require: true
    },
    temperament:{
        type: String,
        require: true
    },
    history:{
        type: String,
        require: true
    },
    especificity:{
        type: String,
        
    }
    
})


module.exports = mongoose.model("Dog", DogSchema)
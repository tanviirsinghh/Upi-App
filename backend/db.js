const mongoose= require("mongoose")
const { Schema } = require("zod")
mongoose.connect('mongodb+srv://ustaadlokk:ustaadlokk@cluster0.fytpafe.mongodb.net/')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        lowercase:true,
        unique:true,
        minLength:4,
        manLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:true,


    },
    firstName:{
        type: String,
        required: true,
        maxLength: 50
    },
    lastName:{
        type: String,
        required: true,
        maxLength: 50
    }

})


const accountSchemma = new  mongoose.Schema({
         
    userId:{
        // reference to the user  model id
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type: Number,
        required:true
    }
})
const User= mongoose.model('User',userSchema)
const Account = mongoose.model('Account', accountSchemma)
module.exports = {
    User,
    Account
}
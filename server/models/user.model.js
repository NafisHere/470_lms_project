import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["instructor", "student"],
        default:'student'
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],

    address: {
        type: String,
        required: false, // Optional field
    },
    

    photoUrl:{
        type:String,
        default:""
    },

    phoneNumber: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v); // Ensures 10-digit phone numbers
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
},{timestamps:true});

export const User = mongoose.model("User", userSchema);
import { Schema as _Schema, model } from "mongoose";


const Schema  = _Schema
const userSchema= new Schema({
    username:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    createdAt: {
    type:Date,
    default: Date.now(),
    }
});
const UserModel = model('users',userSchema);
export default  UserModel

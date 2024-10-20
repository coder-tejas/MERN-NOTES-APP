import { Schema as _Schema, model } from "mongoose";


const Schema = _Schema

const Notesdata = new Schema({
    title:{
        type:String,
        required : true,
    },
    content:{
        type:String,
        required: true,
    }
    ,
    tags:{
        type:[String],
        default :[],
    },
    isPinned:{
        type:Boolean,
        default:false,
    },
    userId: {
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
},{timestamps:true});
 
const NotesModel = model('data',Notesdata);
export default NotesModel;    
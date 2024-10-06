import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    studied:{
        type:String,
        required:true
    }
},{timestamps:true});

export const Studentmodel = mongoose.model("Student",StudentSchema);
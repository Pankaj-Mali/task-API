const mongoose = require("mongoose");

const schema = mongoose.Schema

const taskSchema=new schema({
    title:{type:String ,required:true , unique:true},
    is_completed:{
        type:Boolean ,
        required:true,
        default: false
    }
});

const task = mongoose.model("Task" , taskSchema);

module.exports=task;

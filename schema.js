const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    name: String,
    email: {type:String , unique:true},
    password: String
})

const todoSchema = new Schema({
    title: String,
    time:  Date,
    done: Boolean,
    creatorId: ObjectId
});

const userModel = mongoose.model('userInfo',userSchema);
const todoModel = mongoose.model('todo',todoSchema);

module.exports = {
    userModel,
    todoModel
}
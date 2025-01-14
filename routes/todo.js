const { Router } = require('express');
const {todoModel} = require('../schema')
// const jwt = require("jsonwebtoken");
// const  { JWT_SECRET } = require("../config");
const {auth} = require('../middleware/auth')

const todoRouter = Router();

todoRouter.post('/create_todo',auth,async function(req,res){
    const userId = req.userId
    const {title,time,done} = req.body;

    const todo = await todoModel.create({
        title: title,
        time: new Date(time),
        done: done,
        creatorId: userId
    })

    res.json({
        message: "todo_created",
        userId : todo._id
    })
})

todoRouter.put('/update_todo',auth,async function(req,res){
    const userId = req.userId

    const { title, time, done } = req.body;

    const todo = await todoModel.updateOne({
        creatorId: userId
    }, {
        title: title,
        time: time,
        done: done,
    })

    res.json({
        message: "todo_updated",
        userId : todo._id
    })
})

todoRouter.delete('/delete_todo',auth,async function(req,res){
    const userId = req.userId

    const todo = await todoModel.deleteOne({
        creatorId: userId,
        // _id: todo._id
    })

    res.json({
        message: "todo deleted successfully",
        todo

    })
})

todoRouter.get('/view_todos',auth,async function(req,res){
    const userId = req.userId;

    const todos = await todoModel.find({
        creatorId: userId
    })

    res.json({
        message: "Todos",
        todos
    })
})

module.exports = {
    todoRouter: todoRouter
}


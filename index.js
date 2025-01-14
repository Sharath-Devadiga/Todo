require("dotenv").config()

const express = require('express');
const mongoose = require('mongoose')

const {userRouter} = require('./routes/user')
const {todoRouter} = require('./routes/todo')


const app = express();
app.use(express.json());

app.use('/user',userRouter)
app.use('/todos',todoRouter)

async function dataBase(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
}

dataBase();
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const bcrypt = require('bcrypt');
const {userModel} = require('../schema')

const userRouter = Router();

userRouter.post('/signup',async function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashPassword = await bcrypt.hash(password,5);

    await userModel.create({
        name: name,
        email: email,
        password: hashPassword
    })

    res.json({
        message: "You have succefully signed up!"
    })

})

userRouter.post('/signin', async function (req,res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email: email,
    })

    const passwordMatch = await bcrypt.compare(password,user.password);

    if(email && passwordMatch){
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET)

        res.json({
            message: "Signed In!",
            token
        })
    }
});

module.exports = {
    userRouter: userRouter
}

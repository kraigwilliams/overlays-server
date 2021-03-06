//require('dotenv').config()
const express = require('express')
const cors = require('cors');
const helmet = require('helmet')
const morgan = require('morgan')
const topicsRouter= require('./topics/topics-router');
const authRouter = require('./auth/auth-router')
const userRouter= require('./users/usersRouter')
//const groupsRouter = require('./groups/groups-router')
const notesRouter= require('./notes/notes-router')
const app = express()
const { NODE_ENV } = require('./config')
const morganOption = (NODE_ENV=== 'production')
? 'tiny' : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
//app.use('/api/groups', groupsRouter)
app.use('/api/topics', topicsRouter)
app.use('/api/auth', authRouter)
app.use('/api/auth/users',userRouter)
app.use('/api/notes',notesRouter)

app.get('/',(req,res)=>{
res.status(200).send("Hello World.")
})

app.use(function erroHandler(error, req,res,next){
 let response;
 console.error(error)
 if( NODE_ENV === 'production'){
     response ={error:{message:'server error'}}
 }
 else {
     
     response = {message: error.message, error}
 }   
})

module.exports = app;

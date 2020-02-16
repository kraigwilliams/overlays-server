const express = require('express')
const path = require('path')
const NotesService = require('./notes-service')
const xss= require('xss')

const {requireAuth} = require('../middleware/jwt-auth')
const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNote = note => ({
  id: note.id,
  note_title:xss(note.note_title),
from_topic:note.from_topic,
  note_contents: xss(note.note_contents),             
 // date_added: topic.date_added,
 note_owner:note.note_owner
})


notesRouter
.use(requireAuth)
//.use(jsonParser)

 .route('/')


.get((req,res,next)=>{
  const knexInstance=  req.app.get('db')  
  //const user=req.user.id
  //console.log("user",user)
  console.log("this is req",req)
  NotesService.getAllNotes(knexInstance,Number(req.user.id),Number(req.from_topic))
    .then(notes=>{
        console.log("this is req",req)
        res.json(notes.map(serializeNote))
    })
    .catch(next)
})
.post(jsonParser, (req, res, next) => {
    const { note_title, note_contents, from_topic} = req.body
    
    const newNote = { note_title,note_contents,from_topic}

    for (const [key, value] of Object.entries(newNote)) {
           if (value == null) {
             return res.status(400).json({
               error: { message: `Missing '${key}' in request body` }
             })
           }
         }
         newNote.note_owner=req.user.id

    NotesService.insertNote(
      req.app.get('db'),
      newNote
    )
      .then(note => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${note.id}`))
          //.location(`/topics/${topic.id}`)
          .json(serializeNote(note))
      })
      .catch(next)
  })
  notesRouter
  .route('/:topicId')
  .get((req, res, next) => {
      console.log("this is req.params",req.params)
    const knexInstance = req.app.get('db')
    NotesService.getAllNotes(knexInstance, req.params.topicId)
      .then(note=> {
      
        if (!note) {
          return res.status(404).json({
            error: { message: `There are no notes.` }
          })
        }
        console.log("this is note",note)
        res.json(note)
      })
      .catch(next)
  })

  module.exports = notesRouter
const express = require('express')
const path = require('path')
const NotesService = require('./notes-service')
const xss= require('xss')

const {requireAuth} = require('../middleware/jwt-auth')
const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNote = note =>({
  id: note.id,
  note_title:xss(note.note_title),

  note_contents: xss(note.note_contents),             

 note_owner:note.note_owner,
 from_topic:xss(note.from_topic)
})


notesRouter
.use(requireAuth)


 .route('/')


.get((req,res,next)=>{
  const knexInstance=  req.app.get('db')  
  console.log("final",req.topicName)
  NotesService.getAllNotes(knexInstance,Number(req.user.id),Number(req.topicName))
    .then(notes=>{

        res.json(notes.map(serializeNote))
    })
    .catch(next)
})
.post(jsonParser, (req, res, next) => {
    const { note_title, note_contents, from_topic} = req.body
    
    const newNote = { note_title,note_contents,from_topic}
console.log(newNote,"new Note")
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
          
          .json(serializeNote(note))
      })
      .catch(next)
  })

notesRouter
.route('/bytopic/:topicName')
.get((req, res, next) => {
  //let clean = String(req.params.TopicName)
  let clean= req.params.topicName.replace("-", " ");
  console.log(clean,"clean",req.params.topicName)
  const knexInstance = req.app.get('db')
  
  NotesService.getAllNotes(knexInstance, clean)
    .then(note=> {
    
      if (!note) {
        return res.status(404).json({
          error: { message: `There are no notes.` }
        })
      }
      console.log("note",note)

      res.json(note.map(serializeNote))
    })
    .catch(next)
})

  notesRouter
  .route('/:noteId')
  .get((req, res, next) => {
  
    const knexInstance = req.app.get('db')
    NotesService.getById(knexInstance, req.params.noteId)
      .then(note=> {
      
        if (!note) {
          return res.status(404).json({
            error: { message: `There are no notes.` }
          })
        }
        

        res.json(serializeNote(note))
      })
      .catch(next)
  })
  .delete((req,res,next)=>{
    const knexInstance = req.app.get('db')
    NotesService.deleteNote(knexInstance,req.params.noteId)
    .then(()=>{
      res.status(204).end()
    })
    .catch(next)
  }
  )
  module.exports = notesRouter
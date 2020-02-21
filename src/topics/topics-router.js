const express = require('express')
const path = require('path')
const TopicsService = require('./topics-service')
const xss= require('xss')

const {requireAuth} = require('../middleware/jwt-auth')
const topicsRouter = express.Router()
const jsonParser = express.json()

const serializeTopic = topic => ({
  id: Number(topic.id),
  topic_name:xss(topic.topic_name),
  topic_url: xss(topic.topic_url),
  note: xss(topic.note),
  date_added: topic.date_added,
 // user_id:req.user.id
})


topicsRouter
.use(requireAuth)


.route('/')
.get((req,res,next)=>{
  const knexInstance=  req.app.get('db')  
  const user=req.user.id
  //console.log("user",user)
  TopicsService.getAllTopics(knexInstance,Number(req.user.id))
    .then(topics=>{
        res.json(topics.map(serializeTopic))
    })
    .catch(next)
})
.post(jsonParser, (req, res, next) => {
    const { topic_name, topic_url } = req.body
    const newTopic = { topic_name, topic_url}

    for (const [key, value] of Object.entries(newTopic)) {
           if (value == null) {
             return res.status(400).json({
               error: { message: `Missing '${key}' in request body` }
             })
           }
         }
         newTopic.user_id=req.user.id

    TopicsService.insertTopic(
      req.app.get('db'),
      newTopic
    )
      .then(topic => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${article.id}`))
          //.location(`/topics/${topic.id}`)
          .json(serializeTopic(topic))
      })
      .catch(next)
  })

  topicsRouter
  .route('/:topic_id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    TopicsService.getById(knexInstance, req.params.topic_id)
      .then(topic => {
        if (!topic) {
          return res.status(404).json({
            error: { message: `This topic does not exist.` }
          })
        }
        res.json(serializeTopic(topic))
      })
      .catch(next)
  })
// .delete((req,res,next))=>{
//   const knexInstance = req.app.get('db')
//   TopicsService.deleteTopic(knexInstance,req.params.topic_id)
//   .then(()=>{
//     res.status(204).end()
// })
// .catch(next)

  module.exports = topicsRouter
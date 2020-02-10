const express = require('express')
const TopicsService = require('./articles-service')

const topicsRouter = express.Router()
const jsonParser = express.json()


topicsRouter
.route('/')
.get((req,res,next)=>{
    TopicsService.getAllTopics(
        req.app.get('db')
    )
    .then(topics=>{
        res.json(topics)
    })
    .catch(next)
})
.post(jsonParser, (req, res, next) => {
    const { topic, topic_url, note } = req.body
    const newTopic = { topic, topic_url, note }

    for (const [key, value] of Object.entries(newTopic)) {
           if (value == null) {
             return res.status(400).json({
               error: { message: `Missing '${key}' in request body` }
             })
           }
         }

    TopicsService.insertTopic(
      req.app.get('db'),
      newTopic
    )
      .then(topic => {
        res
          .status(201)
          .location(`/topics/${topic.id}`)
          .json(article)
      })
      .catch(next)
  })
  articlesRouter
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
        res.json(topic)
      })
      .catch(next)
  })

  module.exports = topicsRouter
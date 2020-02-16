const express = require('express')
const path = require('path')
const GroupsService = require('./groups-service')
const xss= require('xss')

const {requireAuth} = require('../middleware/jwt-auth')
const groupsRouter = express.Router()
const jsonParser = express.json()

const serializeGroup = group => ({
  id: group.id,
  group_name:xss(group.group_name),
 // topic_url: xss(topic.topic_url),
  //note: xss(topic.note),
  //date_added: group.date_added
})

groupsRouter
.route('/')
.get((req,res,next)=>{
  const knexInstance=  req.app.get('db')  
  GroupsService.getAllGroups(knexInstance)
    .then(group=>{
        res.json(group.map(serializeGroup))
    })
    .catch(next)
})
.post(jsonParser, (req, res, next) => {
    const user_groups = req.body.user_groups
    const newGroup = { user_groups}

    for (const [key, value] of Object.entries(newGroup)) {
           if (value == null) {
             return res.status(400).json({
               error: { message: `Missing '${key}' in request body` }
             })
           }
         }

    GroupsService.insertGroup(req.app.get('db'), newGroup)
      .then(group => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${group.id}`))
          //.location(`/topics/${topic.id}`)
          .json(serializeGroup(group))
      })
      .catch(next)
  })
  groupsRouter
  .route('/:group_id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    groupsService.getById(knexInstance, req.params.group_id)
      .then(group => {
        if (!group) {
          return res.status(404).json({
            error: { message: `This topic does not exist.` }
          })
        }
        res.json(serializeTopic(group))
      })
      .catch(next)
  })

  module.exports = groupsRouter
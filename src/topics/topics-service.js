const TopicsService={

    getAllTopics(knex,id){
    return knex.from('overlays_topics').select('*')
    .where('user_id',id)
}
,

insertTopic(knex, newTopic){
return knex
.insert(newTopic)
.into('overlays_topics')
.returning("*")
},
getById(knex,id){
    return knex.from('overlays_topics').select('*').where('id', id)
},

deleteTopic(knex,topicId){
    return knex('overlays_topics')
    .where('id',topicId)
    .delete()
},
updateTopic(knex,id, newTopicFields){
    return knex('overlays_topics')
    .where({id})
    .update(newTopicFields)
},
// getAllNotes(knex,topicId){
//     return knex.from('user_notes').select('*')
//    // .where('user_id',user_id)
//     .where('from_topic',topicId)
//     .join('overlays_topics','user_notes.from_topic','=','overlays_topics.id')
    
// }
}

module.exports= TopicsService;
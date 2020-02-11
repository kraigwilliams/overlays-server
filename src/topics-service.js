const TopicsService={
    getAllTopics(knex){
    return knex.select('*').from('overlays_topics')
}
,

insertTopic(knex, newTopic){
return knex
.insert(newTopic)
.into('overlays_topics')
.returning("*")
},
getById(knex,id){
    return knex.from('overlays_topics').select("*").where('id', id).first()
},

deleteTopic(knex,id){
    return knex('overlays_topics')
    .where({id})
    .delete()
},
updateTopic(knex,id, newTopicFields){
    return knex('overlays_topics')
    .where({id})
    .update(newTopicFields)
}
}

module.exports= TopicsService;
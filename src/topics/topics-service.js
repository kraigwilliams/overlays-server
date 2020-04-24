const TopicsService={
/**
 * 
 * @param {object} knex database connection
 * @param {integer} id user id used to pull all topics associated to that user
 * @returns {array}
 */
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
}


}

module.exports= TopicsService;
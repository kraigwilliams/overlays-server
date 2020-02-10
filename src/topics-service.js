const TopicsService={
    getAllTopics(knex){
    return knex.select('*').from('overlays_topics')}
},
insertTopic(knex, newTopic){

}


const NotesService={

    getAllNotes(knex,topicId){
    return knex.from('user_notes').select('*')
   // .where('user_id',user_id)
    .where('from_topic',topicId)
}
,

insertNote(knex, newNote){
return knex
.insert(newNote)
.into('user_notes')
//.where('from_topic',newNote.from_topic)
.returning("*")
},

getById(knex,id){
    return knex.from('overlays_topics').select('*').where('id', id)
},

deleteTopic(knex,id){
    return knex('user_notes')
    .where({id})
    .delete()
},
updateTopic(knex,id, NoteFields){
    return knex('user_notes')
    .where({id})
    .update(newTopicFields)
}
}

module.exports= NotesService;
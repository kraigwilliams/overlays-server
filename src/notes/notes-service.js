const NotesService={

    getAllNotes(knex,topicId){
    return knex.from('user_notes').select('*')
   // .where('user_id',user_id)
    .where('from_topic',topicId)
    .join('overlays_topics','user_notes.from_topic','=','overlays_topics.id')
    
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

deleteNote(knex,id){
    return knex('user_notes')
    .where({id})
    .delete()
},
updateNote(knex,id, newNoteFields){
    return knex('user_notes')
    .where({id})
    .update(newNoteFields)
},
// getNoteTopic(knex){
// return knex('user_notes')
// .join('overlays_topics','user_notes.from_topic','=','overlays_topics.id')
// .select('topic_name')
// }

}

module.exports= NotesService;
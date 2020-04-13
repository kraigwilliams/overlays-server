const NotesService = {
  getAllNotes(knex, topicName) {
    return (

      // knex('overlays_topics')
      // .join('user_notes',
      // "overlays_topics.topic_name"
      // )

      knex
        .from("user_notes")
        .select('user_notes.*')
        .join('overlays_topics','user_notes.from_topic','overlays_topics.id')
        // .where('user_id',user_id)
        .where("topic_name", topicName)
        // .join(
        //   "overlays_topics",
        //   "user_notes.topic_name",
        //   "=",
        //   "overlays_topics.topic_name"
        // )
    );
  },
  insertNote(knex, newNote) {
    return (
      knex
        .insert(newNote)
        .into("user_notes")
        //.where('from_topic',newNote.from_topic)
        .returning("*")
    );
  },

  getById(knex, id) {
    return knex
      .from("user_notes")
      .select("*")
      .where("id", id);
  },

  deleteNote(knex, id) {
    return knex("user_notes")
      .where("id", id)
      .delete();
  },
  updateNote(knex, id, newNoteFields) {
    return knex("user_notes")
      .where({ id })
      .update(newNoteFields);
  }
  // getNoteTopic(knex){
  // return knex('user_notes')
  // .join('overlays_topics','user_notes.from_topic','=','overlays_topics.id')
  // .select('topic_name')
  // }
};

module.exports = NotesService;

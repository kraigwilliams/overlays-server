const NotesService = {

/**
 * Gets all the notes from the database based on the specified topic name
 * @param {database connection} knex 
 * @param {string} topicName 
 */

  getAllNotes(knex, topicName) {
    return (

      

      knex
        .from("user_notes")
        .select('user_notes.*')
        .join('overlays_topics','user_notes.from_topic','overlays_topics.id')
        
        .where("topic_name", topicName)
       
    );
  },

  /**
   * 
   * @param {database connection} knex 
   * @param {object} newNote 
   */
  insertNote(knex, newNote) {
    return (
      knex
        .insert(newNote)
        .into("user_notes")
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
  }
 
};

module.exports = NotesService;

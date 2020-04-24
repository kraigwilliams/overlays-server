const NotesService = {

/**
 * Gets all the notes from the database based on the specified topic name
 * @param {objec} knex database connection
 * @param {string} topicName name of the topic to use to get all associated notes
 * @returns {array} 
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
   * @returns {array}
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
/**
 * 
 * @param {object} knex database connection
 * @param {integer} id id of the note to be deleted from the database
 */
  deleteNote(knex, id) {
    return knex("user_notes")
      .where("id", id)
      .delete();
  }
 
};

module.exports = NotesService;

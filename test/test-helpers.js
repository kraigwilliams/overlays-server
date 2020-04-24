const knex = require("knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../src/config");


function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "admin",
      user_password: "1@Thinkful",
    },
    {
      id: 2,
      user_name: "kwill",
       user_password: "1@Thinkful",
    },
  ];
}

function makeTopicsArray() {
  return [
    {
      id: 1,
      topic_name: "Amazon",
      topic_url: "https://amazon.com",
    
      user_id: 1,
    },
    {
      id: 2,
      topic_name: "Google",
      topic_url: "https://google.com",
      
      user_id: 1
    },
  ];
}
function makeNotesArray() {
  return [
    {
      id: 1,
      topic_name: "Google",
      note_owner: 1,
      note_title: "First Google Note",
      note_contents: "Content of first google note"
    },
    {
      id: 2,
      topic_name: "Amazon",
      note_owner: 1,
      note_title: "First Amazon Note",
      note_contents: "Content of first amazon note"
    }
  ];
}




function makeExpectedTopic(users, topic) {
  
  return {
    id: topic.id,
    
    topic_url: topic.topic_url,
    topic_name: topic.topic_name
  };
}

function makeExpectedNote(users, note) {
  return {
    id: note.id,
    note_owner: note.note_owner,
   topic_name:note.topic_name
  };
}

function makeTopicsFixtures() {
  const testUsers = makeUsersArray();
  const testTopics = makeTopicsArray(testUsers);

  return { testUsers, testTopics };
}

function makeNotesFixtures() {
  const testUsers = makeUsersArray();
  const testNotes = makeNotesArray(testUsers);
  const testTopics = makeTopicsArray(testUsers);

  return { testUsers, testNotes,testTopics };
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256",
    expiresIn: config.JWT_EXPIRY,
  });
  return `Bearer ${token}`;
}

/**
 * remove data from tables and reset sequences for SERIAL id fields
 * @param {knex instance} db
 * @returns {Promise} - when tables are cleared
 */
function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE user_notes, overlays_topics,overlays_users`)
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE user_notes_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE overlays_topics_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE overlays_users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('user_notes_id_seq', 0)`),
          trx.raw(`SELECT setval('overlays_topics_id_seq', 0)`),
          trx.raw(`SELECT setval('overlays_users_id_seq', 0)`)
        ])
      )
  );
}

/**
 * insert users into db with bcrypted passwords and update sequence
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @returns {Promise} - when users table seeded
 */
function seedUsers(db, users) {
  console.log(users, "users")
  const preppedUsers = users.map((user) => ({
    ...user, user_password: bcrypt.hashSync(user.user_password, 1),
  }) );
  return db.transaction(async (trx) => {
    await trx.into("overlays_users").insert(preppedUsers);

    await trx.raw(`SELECT setval('overlays_users_id_seq', ?)`, [
      users[users.length - 1].id,
    ]);
  });
}

function seedTopicTable(db, users, topics) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async (trx) => {
    await seedUsers(trx, users);
    await trx.into("overlays_topics").insert(topics);
    // update the auto sequence to match the forced id values
    await trx.raw(`SELECT setval('overlays_topics_id_seq', ?)`, [
      topics[topics.length - 1].id,
    ]);
    // only insert comments if there are some, also update the sequence counter
  });
}


function seedNoteTable(db, users, notes) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async (trx) => {
    await seedUsers(trx, users);
    
    await trx.into("user_notes").insert(notes);
    // update the auto sequence to match the forced id values
    await trx.raw(`SELECT setval('user_notes_id_seq', ?)`, [
      notes[notess.length - 1].id,
    ]);
  });
}

module.exports = {
  seedTopicTable,
  seedNoteTable,
  
  makeUsersArray,
  
  makeTopicsArray,
  makeNotesArray,
  makeTopicsFixtures,
  makeNotesFixtures,
  makeExpectedNote,
  makeExpectedTopic,
 makeAuthHeader,
  cleanTables,
  seedUsers,
};

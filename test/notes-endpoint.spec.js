const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe.only("Notes Endpoints", function () {
  let db;
  const {
    testUsers,
    testNotes,
    testTopics
  } = helpers.makeNotesFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));
  beforeEach("cleanup", () => helpers.cleanTables(db));

  describe(`Get /api/notes`, () => {
    context(`Given no notes`, () => {
      //beforeEach("insert users ", () => helpers.seedUsers(db, testUsers));
      beforeEach("insert topics", () =>helpers.seedTopicTable(db, testUsers, testTopics));
      it(`responds with 200 and an empty notes list`, () => {
        return supertest(app)
          .get("/api/notes")
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });

    context("Given there are notes in the database", () => {
      beforeEach("insert notes", () =>{
      console.table([ testTopics[0],testTopics[1]])
      return helpers.seedTopicTable(db, testUsers, testTopics)
      });

      it("responds with 200 and all of the notes", () => {
        console.log('test notes',testNotes)
        const expectedNotes = testNotes.map((note) =>
          helpers.makeExpectedNote(testUsers, note)
        );
        return supertest(app)
          .get("/api/notes")
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedNotes);
      });
    });
  });

  
});

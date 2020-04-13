const knex = require("knex");
const app = require("../src/app");
const helpers = require('./test-helpers')
// const {makeTopicsArray} = require("./topics.fixtures");
// const { makeUsersArray } = require("./users.fixtures");

describe("Topics Endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
    console.log("WWWWWWORKKINGGG")
  });

  after("disconnect from db", () => db.destroy());




})
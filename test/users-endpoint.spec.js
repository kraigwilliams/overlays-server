const bcrypt = require("bcryptjs");
const app = require("../src/app");
const helpers = require("./test-helpers");
const knex = require("knex");

describe("User Endpoints", function () {
  let db;

  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[0];

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

  /**
   * @description Register a user and populate their fields
   **/
  describe(`POST /api/auth/users`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

    const requiredFields = ["user_name", "user_password"];

    requiredFields.forEach((field) => {
      const registerAttemptBody = {
        user_name: "test username",
        user_password: "test password"
        
      };

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete registerAttemptBody[field];

        return supertest(app)
          .post("/api/auth/users")
          .send(registerAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          });
      });
    });

    it(`responds 400 'Password be longer than 8 characters' when empty password`, () => {
      const userShortPassword = {
        user_name: "test username",
        user_password: "1234567",
        
      };
      return supertest(app)
        .post("/api/auth/users")
        .send(userShortPassword)
        .expect(400, { error: `Password be longer than 8 characters` });
    });

    it(`responds 400 'Password be less than 72 characters' when long password`, () => {
      const userLongPassword = {
        user_name: "test username",
        user_password: "*".repeat(73),
        
      };
      return supertest(app)
        .post("/api/auth/users")
        .send(userLongPassword)
        .expect(400, { error: `Password be less than 72 characters` });
    });

    it(`responds 400 error when password starts with spaces`, () => {
      const userPasswordStartsSpaces = {
        user_name: "test username",
        user_password: " 1Aa!2Bb@",
        
      };
      return supertest(app)
        .post("/api/auth/users")
        .send(userPasswordStartsSpaces)
        .expect(400, {
          error: `Password must not start or end with empty spaces`,
        });
    });

    it(`responds 400 error when password ends with spaces`, () => {
      const userPasswordEndsSpaces = {
        user_name: "test username",
        user_password: "1Aa!2Bb@ "
       
      };
      return supertest(app)
        .post("/api/auth/users")
        .send(userPasswordEndsSpaces)
        .expect(400, {
          error: `Password must not start or end with empty spaces`,
        });
    });

    it(`responds 400 error when password isn't complex enough`, () => {
      const userPasswordNotComplex = {
        user_name: "test username",
        user_password: "11AAaabb"
        
      };
      return supertest(app)
        .post("/api/auth/users")
        .send(userPasswordNotComplex)
        .expect(400, {
          error: `Password must contain one upper case, lower case, number and special character`,
        });
    });

    it(`responds 400 'User name already taken' when username isn't unique`, () => {
      const duplicateUser = {
        user_name: testUser.user_name,
        user_password: "11AAaa!!",
        
      };
      return supertest(app)
        .post("/api/auth/users")
        .send(duplicateUser)
        .expect(400, { error: `Username already taken` });
    });

    describe(`Given a valid user`, () => {
      it(`responds 201, serialized user with no password`, () => {
        const newUser = {
          user_name: "test username",
          user_password: "11AAaa!!",
          
        };
        return supertest(app)
          .post("/api/auth/users")
          .send(newUser)
          .expect(201)
          .expect((res) => {
            expect(res.body).to.have.property("id");
            expect(res.body.user_name).to.eql(newUser.user_name);
            
            expect(res.body).to.not.have.property("password");
            expect(res.headers.location).to.eql(`/api/auth/users/${res.body.id}`);
          });
      });

      it(`stores the new user in db with bcryped password`, () => {
        const newUser = {
          user_name: "test username",
          user_password: "11AAaa!!",
          
        };
        return supertest(app)
          .post("/api/auth/users")
          .send(newUser)
          .expect((res) =>
            db
              .from("overlays_users")
              .select("*")
              .where({ id: res.body.id })
              .first()
              .then((row) => {
                expect(row.user_name).to.eql(newUser.user_name);
                

                return bcrypt.compare(newUser.user_password, row.user_password);
              })
              .then((compareMatch) => {
                expect(compareMatch).to.be.true;
              })
          );
      });
    });
  });
});

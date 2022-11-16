const request = require("supertest");
const app = require("../app.js");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const db = require("../db/connection.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("POST /api/reviews/:review_id/comments", () => {
  describe("Happy path", () => {
    test("Should add a comment to a review by id", () => {
      return request(app)
        .post("/api/reviews/2/comments")
        .send({
          username: "mallionaire",
          body: "I love this testing thing",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toMatchObject({
            comment_id: expect.any(Number),
            review_id: 2,
            votes: expect.any(Number),
            username: "mallionaire",
            body: "I love this testing thing",
          });
        });
    });
  });
});

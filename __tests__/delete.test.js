const request = require("supertest");
const app = require("../app.js");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const db = require("../db/connection.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("DELETE api/comments/:comment_id", () => {
  describe("Happy path", () => {
    test("should delete the given comment", () => {
      return request(app)
        .delete("/api/comments/2")
        .expect(200)
        .then(({ body }) => {
          expect(body.deleted).toEqual({
            comment_id: 2,
            body: "My dog loved this game too!",
            review_id: 3,
            author: "mallionaire",
            votes: 13,
            created_at: expect.any(String),
          });
        });
    });
  });
  describe("errors", () => {
    test(" 404 valid id but it doesnt exist", () => {
      return request(app)
        .delete("/api/comments/568974")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Comment not found");
        });
    });
    test("400 invalid id given", () => {
      return request(app)
        .delete("/api/comments/apiricots")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad request!");
        });
    });
  });
});

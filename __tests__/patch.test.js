const request = require("supertest");
const app = require("../app.js");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const db = require("../db/connection.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("PATCH /api/reviews/:review_id", () => {
  describe("Happy path", () => {
    test("should update votes in the reviews table with the supplied number of votes", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: 1 })
        .expect(202)
        .then(({ body }) => {
          expect(body.review).toEqual({
            review_id: 2,
            title: expect.any(String),
            category: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_body: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: 6,
          });
        });
    });
    test("Can decrement votes", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: -1 })
        .expect(202)
        .then(({ body }) => {
          expect(body.review).toEqual({
            review_id: 2,
            title: expect.any(String),
            category: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_body: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: 4,
          });
        });
    });
    test("Can update votes by more than 1", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: 150 })
        .expect(202)
        .then(({ body }) => {
          expect(body.review).toEqual({
            review_id: 2,
            title: expect.any(String),
            category: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_body: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: 155,
          });
        });
    });
  });
});

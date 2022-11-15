const request = require("supertest");
const app = require("../app.js");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const db = require("../db/connection.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("bad paths", () => {
  test("GET 404 return 404 on invalid url", () => {
    return request(app)
      .get("/api/wrongURL")
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("invalid url");
      });
  });
});

describe("GET api/categories", () => {
  test("return the categories ", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((result) => {
        expect(result.body.categories).toBeInstanceOf(Array);
        expect(result.body.categories.length).toBeGreaterThan(0);
        result.body.categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            }),
          );
        });
      });
  });
});
describe("GET /api/reviews", () => {
  test("returns all the reviews", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeInstanceOf(Array);
        expect(result.body.reviews.length).toBeGreaterThan(0);
        result.body.reviews.forEach((reviews) => {
          expect(reviews).toEqual({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            review_body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test.only("should return all the reviews with a given id", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toBeInstanceOf(Array);
        expect(body.review.length).toBeGreaterThan(0);
        expect(body.review[0]).toEqual({
          review_id: 1,
          title: "Agricola",
          review_body: "Farmyard fun!",
          designer: "Uwe Rosenberg",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          category: "euro game",
          created_at: expect.any(String),
          votes: 1,
          owner: "mallionaire",
        });
      });
  });
});

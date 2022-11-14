const request = require("supertest");
const app = require("../app.js");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
console.log(seed);

beforeEach(() => {
  seed(data);
});

describe.only("GET", () => {
  describe("GET api/categories", () => {
    test("return the categories ", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((result) => {
          expect(result.body.categories).toBeInstanceOf(Array);
        });
    });
  });
});

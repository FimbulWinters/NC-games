const express = require("express");
const { catchAll, customErrors } = require("./Controllers/errorsController");
const {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsByReviewID,
} = require("./Controllers/getController");
const { patchReviewVotes } = require("./Controllers/patchController");

const app = express();
app.use(express.json());

// GET

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);

// PATCH
app.patch("/api/reviews/:review_id", patchReviewVotes);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "invalid url" });
});

// ERRORS

app.use(customErrors);

app.use(catchAll);

module.exports = app;

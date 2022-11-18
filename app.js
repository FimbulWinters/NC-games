const express = require("express");
const { deleteCommentById } = require("./Controllers/deleteController");
const { catchAll, customErrors } = require("./Controllers/errorsController");
const {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsByReviewID,
  getUsers,
} = require("./Controllers/getController");

const { patchReviewVotes } = require("./Controllers/patchController");
const { postCommentToReview } = require("./Controllers/postController");

const app = express();
app.use(express.json());

// GET

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);
app.get("/api/users", getUsers);

// PATCH
app.patch("/api/reviews/:review_id", patchReviewVotes);

// POST
app.post("/api/reviews/:review_id/comments", postCommentToReview);

// DELETE
app.delete("/api/comments/:comment_id", deleteCommentById);

// all others

app.all("/*", (req, res) => {
  res.status(404).send({ message: "invalid url" });
});

// ERRORS

app.use(customErrors);

app.use(catchAll);

module.exports = app;

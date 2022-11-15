const express = require("express");
const { catchAll, customErrors } = require("./Controllers/errorsController");
const {
  getCategories,
  getReviews,
  getReviewById,
} = require("./Controllers/getController");

const app = express();

// GET

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);

app.all("/*", (req, res) => {
  res.status(404).send({ message: "invalid url" });
});

// ERRORS

app.use(customErrors);

app.use(catchAll);

module.exports = app;

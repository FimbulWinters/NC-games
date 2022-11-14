const express = require("express");
const { catchAll } = require("./Controllers/errorsController");
const { getCategories } = require("./Controllers/getController");

const app = express();

// GET

app.get("/api/categories", getCategories);
app.all("/*", (req, res) => {
  res.status(404).send({ message: "invalid url" });
});

// ERRORS

app.use(catchAll);

module.exports = app;

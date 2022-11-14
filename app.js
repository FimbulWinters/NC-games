const express = require("express");
const { getCategories } = require("./Controllers/getController");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

module.exports = app;

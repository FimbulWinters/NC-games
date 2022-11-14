const categories = require("../db/data/test-data/categories");
const { selectCategories } = require("../Models/getModels");

exports.getCategories = (req, res) => {
  selectCategories().then((categories) => {
    res.send({ categories });
  });
};

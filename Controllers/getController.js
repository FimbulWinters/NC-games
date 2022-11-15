const { selectCategories, selectReviews } = require("../Models/getModels");

exports.getCategories = (req, res) => {
  selectCategories()
    .then((categories) => {
      res.send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getReviews = (req, res) => {
  selectReviews().then((reviews) => {
    res.send({ reviews });
  });
};

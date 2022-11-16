const {
  selectCategories,
  selectReviews,
  selectReviewById,
} = require("../Models/getModels");

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
exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

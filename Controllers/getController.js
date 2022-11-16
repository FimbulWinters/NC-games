const {
  selectCategories,
  selectReviews,
  selectReviewById,
  selectCommentsByReviewId,
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
exports.getCommentsByReviewID = (req, res, next) => {
  const { review_id } = req.params;
  selectCommentsByReviewId(review_id).then((comments) => {
    console.log(comments);
    res.status(200).send({ comments });
  });
};

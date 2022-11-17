const {
  selectCategories,
  selectReviews,
  selectReviewById,
  selectCommentsByReviewId,
  selectUsers,
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
  const { category, sort_by, order } = req.query;

  selectReviews(category, sort_by, order).then((reviews) => {
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
  selectCommentsByReviewId(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.send({ users });
    })
    .catch(next);
};

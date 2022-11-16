const { insertComment } = require("../Models/postModel");

exports.postCommentToReview = (req, res, next) => {
  const { review_id } = req.params;
  const body = req.body;

  insertComment(review_id, body)
    .then((comment) => {
      const changedComment = { ...comment };
      changedComment.username = comment.author;
      delete changedComment.author;
      res.status(201).send({ comment: changedComment });
    })
    .catch(next);
};

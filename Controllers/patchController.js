const { updateVotes } = require("../Models/patchModel");

exports.patchReviewVotes = (req, res, next) => {
  const { review_id } = req.params;
  const body = req.body;

  updateVotes(review_id, body)
    .then((review) => {
      res.status(202).send({ review });
    })
    .catch(next);
};

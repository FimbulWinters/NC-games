const { deleteGivenComment } = require("../Models/deleteModel");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  deleteGivenComment(comment_id)
    .then((deleted) => {
      res.status(200).send();
    })
    .catch(next);
};

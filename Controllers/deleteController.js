const { deleteGivenComment } = require("../Models/deleteModel");

exports.deleteCommentById = (req, res) => {
  const { comment_id } = req.params;
  deleteGivenComment(comment_id).then((deleted) => {
    res.status(200).send({ deleted });
  });
};

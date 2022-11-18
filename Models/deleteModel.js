const db = require("../db/connection");

exports.deleteGivenComment = (id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Comment not found" });
      }
      return result.rows[0];
    });
};

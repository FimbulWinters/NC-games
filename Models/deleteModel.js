const db = require("../db/connection");

exports.deleteGivenComment = (id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [id])
    .then((result) => {
      return result.rows[0];
    });
};

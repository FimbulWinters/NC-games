const db = require("../db/connection");
const {
  convertTimestampToDate,
  doesReviewExist,
} = require("../db/seeds/utils");

exports.insertComment = (id, data) => {
  const { body, username } = data;
  return doesReviewExist(id)
    .then(() => {
      return db.query(
        `INSERT INTO comments (body, author, review_id) VALUES ($1,$2,$3) RETURNING *;`,
        [body, username, id],
      );
    })
    .then((res) => {
      return res.rows[0];
    });
};

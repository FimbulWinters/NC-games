const db = require("../db/connection.js");
const { doesReviewExist } = require("../db/seeds/utils.js");

exports.updateVotes = (id, voteAction) => {
  return doesReviewExist(id)
    .then(() => {
      return db.query(`SELECT votes FROM reviews WHERE review_id = $1`, [id]);
    })
    .then((res) => {
      const currentVotes = res.rows[0].votes;
      const newVotes = currentVotes + voteAction.inc_votes;
      return db.query(
        `UPDATE reviews SET votes = $1 WHERE review_id = $2 RETURNING *`,
        [newVotes, id],
      );
    })
    .then((result) => {
      return result.rows[0];
    });
};

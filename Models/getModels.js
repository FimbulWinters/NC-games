const db = require("../db/connection");
const {
  convertTimestampToDate,
  doesReviewExist,
} = require("../db/seeds/utils");

exports.selectCategories = () => {
  return db
    .query(
      `
  SELECT * FROM categories;
    `,
    )
    .then((results) => {
      return results.rows;
    });
};

exports.selectReviews = () => {
  return db
    .query(
      `
      SELECT *, COUNT(review_id) AS comment_count FROM reviews group by review_id;
  `,
    )
    .then((results) => {
      return results.rows;
    });
};
exports.selectReviewById = (id) => {
  return db
    .query(
      `
      SELECT * FROM reviews WHERE review_id = $1;
    
    `,
      [id],
    )
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Review not found!" });
      } else {
        return res.rows;
      }
    });
};

exports.selectCommentsByReviewId = (id) => {
  return doesReviewExist(id)
    .then(() => {
      return db.query(
        `
      SELECT * FROM comments WHERE review_id = $1;
    `,
        [id],
      );
    })
    .then((res) => {
      return res.rows;
    });
};

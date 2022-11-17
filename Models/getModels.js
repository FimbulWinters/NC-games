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
      SELECT reviews.*,COUNT(comment_id) AS comment_count FROM reviews
      JOIN comments ON reviews.review_id = comments.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id, comments.comment_id;
    
    `,
      [id],
    )
    .then((result) => {
      if (result.rows.length !== 0) {
        return result.rows;
      } else {
        return db
          .query(`SELECT * FROM reviews WHERE review_id = $1`, [id])
          .then((res) => {
            if (res.rows.length === 0) {
              return Promise.reject({
                status: 404,
                message: "Review not found!",
              });
            } else {
              return res.rows;
            }
          });
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

exports.selectUsers = () => {
  return db.query(`SELECT * FROM users;`).then((res) => {
    return res.rows;
  });
};

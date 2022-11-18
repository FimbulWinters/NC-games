const db = require("../db/connection");
const {
  convertTimestampToDate,
  doesReviewExist,
  doesCategoryExist,
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

exports.selectReviews = (categories, sortBy = "created_at", order = "DESC") => {
  return doesCategoryExist(categories)
    .then(() => {
      const sortAllowed = [
        "owner",
        "title",
        "review_id",
        "category",
        "review_img_url",
        "review_body",
        "created_at",
        "votes",
        "designer",
        "comment_count",
        "default",
      ];
      const orderAllowed = ["ASC", "DESC"];

      const queries = [];
      let queryString =
        "SELECT *, COUNT(review_id) AS comment_count FROM reviews ";

      if (categories) {
        queryString += "WHERE category = $1 ";
        queries.push(categories);
      }

      queryString += "GROUP BY review_id ";

      if (!sortAllowed.includes(sortBy)) {
        return Promise.reject({ status: 400, message: "invalid query" });
      }
      queryString += `ORDER BY ${sortBy} `;

      if (!orderAllowed.includes(order)) {
        return Promise.reject({ status: 400, message: "invalid query" });
      }

      queryString += `${order} `;

      console.log(queryString);

      return db.query(queryString, queries);
    })
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

const { query } = require("../connection.js");
const db = require("../connection.js");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.doesReviewExist = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Review not found" });
      }
    });
};

exports.doesUsernameExist = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1 `, [username])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Username not found" });
      }
    });
};

exports.doesCategoryExist = (category) => {
  const values = [];
  let queryString = "SELECT * FROM categories";
  if (category) {
    queryString += " WHERE slug = $1";
    values.push(category);
  }
  return db.query(queryString, values).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 400, message: "Category not found" });
    }
  });
};

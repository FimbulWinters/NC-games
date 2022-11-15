const db = require("../db/connection");

exports.selectCategories = () => {
  return db
    .query(
      `
  SELECT * FROM categories;
    `,
    )
    .then((results, err) => {
      if (err) err;
      return results.rows;
    });
};

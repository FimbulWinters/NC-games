exports.catchAll = (err, req, res, next) => {
  res.status(500).send("Internal Server Error!");
};

exports.customErrors = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  }
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad request!" });
  }
};

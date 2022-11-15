exports.catchAll = (err, req, res, next) => {
  res.status(500).send("Internal Server Error!");
};

exports.customErrors = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  }
};

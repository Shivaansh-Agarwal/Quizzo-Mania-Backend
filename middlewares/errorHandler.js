function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    data: null,
    message: "Something broke on server!",
  });
  next();
}

module.exports = { errorHandler };

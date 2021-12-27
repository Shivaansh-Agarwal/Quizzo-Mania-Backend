function routeNotFoundHandler(req, res, next) {
  console.error("\nERROR: Sorry can't find that route!");
  res.status(404).json({
    status: "error",
    data: null,
    message: "Sorry can't find that route!",
  });
}

module.exports = { routeNotFoundHandler };

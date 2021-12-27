function logger(req, res, next) {
  console.log("\n### LOGGING");
  console.log("REQ Path: ", req.path);
  console.log("REQ Method: ", req.method);
  console.log("REQ Body: ", req.body);
  console.log("REQ Params: ", req.params);
  next();
}

module.exports = { logger };

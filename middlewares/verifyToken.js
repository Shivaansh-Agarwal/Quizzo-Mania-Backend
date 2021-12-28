const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  if (req.headers.authorization) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const PRIVATE_KEY = process.env["PRIVATE_KEY"];
    try {
      const decoded = await jwt.verify(token, PRIVATE_KEY);
      next();
    } catch (e) {
      console.log("UNAUTHORIZED ACCESS!!");
      console.error("Issue with JWT Token");
      console.error(e.name);
      console.error(e.message);
      if (e.name === "TokenExpiredError") {
        res.status(401).json({
          status: "fail",
          message: "Session Expired!, Please login again!",
        });
      } else {
        res.status(401).json({
          status: "error",
          message: "Unauthorized Access",
        });
      }
    }
  } else {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized Access",
    });
  }
}

module.exports = { verifyToken };

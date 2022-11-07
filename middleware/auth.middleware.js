const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.token && req.headers.token.startsWith("Bearer")) {
    try {
      token = req.headers.token.split(" ")[1];

      const decoded = jwt.verify(token, process.env.pass_sec);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        error: "Not authorized, Token is not valid",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Not authorized, No token provided",
    });
  }
};

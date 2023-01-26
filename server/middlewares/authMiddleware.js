const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization ?? null;
  if (!token) return res.send("Authorization token is required");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw res.send(error);
  }

  next();
};

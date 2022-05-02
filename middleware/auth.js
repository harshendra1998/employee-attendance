const jwt = require("jsonwebtoken");
const env = require('dotenv');

dotenv.config();

const Auth = async (req, res, next) => {
    const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({errpr: "Invalid Token", token});
  }
  return next();
}
module.exports = Auth
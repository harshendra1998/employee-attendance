const jwt = require("jsonwebtoken");
const env = require('dotenv');

dotenv.config();

const Auth = async (req, res, next) => {
    const barerHeader = req.headers["x-access-token"];
    const barer = barerHeader.split(' ')
  if (barerHeader !== undefined ) {
    const barertoken = barer[1];
    req.token = barertoken;
    next()
  }
  else{
    res.status(401).send({errpr: "Invalid Token", token});
  }
}
module.exports = Auth
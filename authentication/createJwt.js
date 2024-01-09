const jwt = require("jsonwebtoken");

const createJwt = (jwt_data) => {
  const jwt_token = jwt.sign({ user: jwt_data }, process.env.JWT_SECRET, {
    expiresIn: "12h", // Token expiration time
  });

  return jwt_token;
};
module.exports = createJwt;

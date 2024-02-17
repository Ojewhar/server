const JwtTokenDb = require("../../models/JwtTokenDb");
const verifyLogin = async (req, res) => {
  try {
    const { token } = req.query;
    // cheeck token
    const isToken = await JwtTokenDb.findOne({ token: token });

    if (!isToken) {
      res.status(404).json("Token is expired please try again");
    } else {
      // Delete the token from the database after verification
      await JwtTokenDb.findOneAndDelete({ token: token });
      res.status(200).json("Verify successfull");
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyLogin;

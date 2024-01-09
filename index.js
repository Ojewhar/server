const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();
app.use(express.json());

app.get("/", (res, req) => {
  try {
    res.status(200).json("App working fine");
  } catch (error) {
    res.status(400).json("Server error");
  }
});

const PORT = process.env.PORT ? process.env.PORT : 5000;
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

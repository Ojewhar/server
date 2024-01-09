const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.end("App working fine");
});

app.post("/", (req, res) => {
  res.end("App working fine");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

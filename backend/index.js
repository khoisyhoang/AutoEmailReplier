require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("balls");
});

app.listen(8000, () => {
  console.log("backend started running on port 8000");
});

const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.listen(PORT, () => {
  console.log(`server is open at ${PORT}`);
});
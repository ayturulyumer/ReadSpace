const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(3030, () => console.log("Server is running at port 3030"));

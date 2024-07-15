const express = require("express");
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(3030, () => console.log("Server is running at port 3030"));

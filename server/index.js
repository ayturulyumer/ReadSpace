require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { createClient } = require("@supabase/supabase-js");

// Configure Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(3030, () => console.log("Server is running at port 3030"));

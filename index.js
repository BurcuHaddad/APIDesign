const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

const app = express();

const DB = "mongodb://localhost:27017/crm";

mongoose.connect("mongodb://127.0.0.1:27017/", {
    dbName: "crm",
    useNewUrlParser: true,
    useUnifiedTopology: true
}, console.log("Connected"))

app.get("/", (req, res) => {
    res.send("Hello from the server side")
})

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


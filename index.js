const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute")


const app = express();


app.use(express.json({ limit: "10kb" }));


app.use("/api/v1/users", userRouter);

module.exports = app


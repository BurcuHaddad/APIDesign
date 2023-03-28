const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoute")
const customerRouter = require("./routes/customerRoute")


const app = express();


app.use(express.json({ limit: "10kb" }));


app.use("/api/v1/users", userRouter);
app.use("/api/v1/customers", customerRouter);

module.exports = app


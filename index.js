const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan")
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser")
const xss = require("xss-clean")


const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoute");
const customerRouter = require("./routes/customerRoute");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

//MIDDLEWARES


app.use(helmet())

//Dev Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

//Limit reqs from same IP
const limiter = rateLimit({
    max:100,
    windowMs: 60 * 60 * 1000,
    message: "too many requests from this IP, please try again in an hour!"
})
app.use("/api", limiter)

//Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser())

//Data sanitization against XSS
app.use(xss())

//ROUTES
app.use("/api/v1/user", userRouter);
app.use("/api/v1/customer", customerRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

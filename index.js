const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute")

dotenv.config({ path: "./config.env" });
const app = express();

const DB = "mongodb://localhost:27017/crm";

mongoose.connect("mongodb://127.0.0.1:27017/", {
    dbName: "crm",
    useNewUrlParser: true,
    useUnifiedTopology: true
}, console.log("Connected"))

app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
    res.send("Hello from the server side")
})

app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

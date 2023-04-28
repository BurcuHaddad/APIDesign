const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./index");

const DB = "mongodb://localhost:27017/crm";

mongoose.connect(
  "mongodb://127.0.0.1:27017/",
  {
    dbName: "crm",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("Connected")
);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

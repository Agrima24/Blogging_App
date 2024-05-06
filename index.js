const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

require("./models/config");
const bodyparser = require("body-parser");
const router = require("./router/mainRouter");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(router);

const server = app.listen(process.env.PORT, function (req, res) {
  console.log(`server is running on port : ${process.env.PORT}`);
});

module.exports = server;

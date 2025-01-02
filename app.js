const express = require("express");
const pemainRoutes = require("./routes/pemainRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use("/pemain", pemainRoutes);
app.use(errorHandler);

module.exports = app;

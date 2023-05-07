const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");

const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const companyRouter = require("./routes/companyRoutes");
const recordRouter = require("./routes/recordRoutes");

const app = express();

// Middleware to attach JSON data to request
app.use(express.json());

// LOGGIN MIDDLEWARE
// app.use(morgan("dev"));

// Server Ststic files
app.use(express.static("assets"));

// EJS
app.set("view engine", "ejs");

// Middleware to attach Cookie data to request
app.use(cookieParser());

// Test Middleware to Print cookie Data
// app.use("/", (req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

// Routes

app.use("/api/v1/record/", recordRouter);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/", viewRouter);

module.exports = app;

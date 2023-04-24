const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middleware to attach JSON data to request body
app.use(express.json());

// LOGGIN MIDDLEWARE
app.use(morgan("dev"));

//

// Routes

// /api/v1/document
// /api/v1/users

app.use("/api/v1/users/", userRouter);

module.exports = app;

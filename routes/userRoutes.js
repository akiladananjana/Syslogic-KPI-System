const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/login", authController.login);
userRouter.get("/logout", authController.logout);
userRouter.post("/signup", authController.signUp);

module.exports = userRouter;

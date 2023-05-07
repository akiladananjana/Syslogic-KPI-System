const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const viewRouter = express.Router();

viewRouter.get(
  "/",
  authController.redirectLoggedInUsersToDashboard,
  viewController.login
);
viewRouter.get(
  "/login",
  authController.redirectLoggedInUsersToDashboard,
  viewController.login
);
viewRouter.get("/signup", viewController.signup);
viewRouter.get("/dashboard", authController.protect, viewController.dashboard);
viewRouter.get(
  "/record",
  authController.protect,
  viewController.redirectToErrorPage
);
viewRouter.get("/record/:id", authController.protect, viewController.record);
viewRouter.get("/*", viewController.redirectToErrorPage);

module.exports = viewRouter;

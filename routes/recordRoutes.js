const express = require("express");

const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const recordController = require("../controllers/recordController");

const recordRouter = express.Router();

recordRouter.get("/:id", authController.protect, viewController.record);
recordRouter.post("/add", authController.protect, recordController.addRecord);

recordRouter.delete(
  "/delete",
  authController.protect,
  recordController.deleteRecord
);
recordRouter.patch(
  "/update",
  authController.protect,
  recordController.updateRecord
);

module.exports = recordRouter;

const express = require("express");
const multer = require("multer");

const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const recordController = require("../controllers/recordController");

const Record = require("../models/recordModel");

const recordRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/uploads/");
  },
  filename: function (req, file, cb) {
    const kpiId = req.params.kpiId;
    const fileName = kpiId + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

recordRouter.post(
  "/upload/:kpiId",
  authController.protect,
  upload.single("kpi-record-file"),
  async (req, res, next) => {
    const kpiId = req.params.kpiId;
    const fileName = req.file.originalname;
    await Record.updateOne(
      { _id: kpiId }, // find the document to update
      { $set: { fileName } } // update only the field you want
    );

    res.status(200).json({
      status: "success",
    });
    //
  }
);
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

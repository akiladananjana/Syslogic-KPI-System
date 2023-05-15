const Record = require("../models/recordModel");

exports.addRecord = async (req, res, next) => {
  // console.log(req.body);

  const response = await Record.create(req.body);

  res.status(200).json({
    status: "success",
    recordId: response.id,
  });
};

exports.deleteRecord = async (req, res, next) => {
  const kpiRecordId = req.body.kpiRecordId;
  const response = await Record.findByIdAndDelete(kpiRecordId);

  res.status(200).json({
    status: "Success",
  });
};

exports.updateRecord = async (req, res, next) => {
  const { kpiRecordId, percentage, kpiData } = req.body;

  const response = await Record.findByIdAndUpdate(kpiRecordId, {
    percentage,
    kpiData,
  });

  res.status(200).json({
    status: "Success",
  });
};

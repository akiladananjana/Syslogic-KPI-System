const Company = require("../models/companyModel");
const Record = require("../models/recordModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.login = (req, res) => {
  res.render("login");
};

exports.signup = (req, res) => {
  res.render("signup");
};

exports.redirectToErrorPage = (req, res, next) => {
  res.render("error");
};

exports.dashboard = async (req, res) => {
  // console.log(req.userDetails);

  const userDetails = {
    _id: req.userDetails._id,
    firstName: req.userDetails.firstName,
    lastName: req.userDetails.lastName,
    email: req.userDetails.email,
  };

  const companyData = req.companyDetails;
  res.render("dashboard", { companyData, userDetails });
};

exports.record = async (req, res) => {
  try {
    // Pass companyDetails and userDetails to 'record' view
    const userDetails = {
      _id: req.userDetails._id,
      firstName: req.userDetails.firstName,
      lastName: req.userDetails.lastName,
      email: req.userDetails.email,
    };
    const companyId = req.params.id;
    const companyDetails = await Company.findById(companyId);

    // Get all the KPI records related to specific userId and companyId
    const kpiRecords = await Record.aggregate([
      {
        $match: {
          userId: new mongoose.mongo.ObjectId(userDetails._id),
          companyId: new mongoose.mongo.ObjectId(companyId),
        },
      },
    ]);

    res.render("record", { companyDetails, userDetails, kpiRecords });
  } catch (error) {
    res.render("error");
  }
};

const Company = require("../models/companyModel");

exports.addCompany = async (req, res) => {
  const newCompanyData = await Company.create(req.body);

  res.status(200).json({
    status: "success",
    data: newCompanyData,
  });
};

exports.listCompany = async (req, res) => {
  const companyList = await Company.find();

  res.status(200).json({
    status: "success",
    data: companyList,
  });
};

exports.deleteCompanyById = async (req, res, next) => {
  const companyIdsToDelete = req.body.selectedIdArray;

  const response = await Company.deleteMany({
    _id: { $in: companyIdsToDelete },
  });

  res.status(200).json({
    status: "success",
    data: "",
  });
};

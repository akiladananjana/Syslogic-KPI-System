const express = require("express");
const companyController = require("../controllers/companyController");

const companyRouter = express.Router();

companyRouter.get("/", companyController.listCompany);
companyRouter.post("/", companyController.addCompany);
companyRouter.delete("/", companyController.deleteCompanyById);

module.exports = companyRouter;

const express = require("express");
const Companies = require("../models/companies.models");

const router = express.Router();

router.post("/companies/create", async (req, res) => {
  try {
    let dataToSave = {
      name: req.body.name,
      contactPerson: req.body.contactPerson,
      email: req.body.email,
      currency: req.body.currency,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
    };
    const company = await Companies.create(dataToSave);
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/companies", async (req, res) => {
  try {
    const companies = await Companies.find({});
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require("express");
const Companies = require("../models/companies.models");

const router = express.Router();

router.post("/companies/create", async (req, res) => {
  try {
    // let contractPersonId = new mongoose.Types.ObjectId(req.body.contactPerson)
    let dataToSave = {
      name: req.body.name,
      contactPerson: req.body.contactPerson,
      email: req.body.email,
      currency: req.body.currency,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
      taxation: req.body.taxation,
      state: req.body.state,
      area: req.body.area,
      pinCode: req.body.pinCode,
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
    // let id = mongoose.Types.ObjectId('')
    // const companies = await Companies.aggregate([{
    //   $lookup: {
    //     from: "Contacts",
    //     localField: "contactPerson",
    //     foreignField: "_id",
    //     as: "contacts_data"
    //   }
    // }])
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/companies/list", async (req,res) => {
  try{
    const companies = await Companies.find({});
    const companyList = companies.map((comp) => {
      return {id: comp._id, name: comp.name }
    })
    console.log("companies data",companyList);
    res.status(200).json(companyList);
  } catch(e){

  }
})

module.exports = router;

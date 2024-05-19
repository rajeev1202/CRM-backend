const express = require("express")
const router = express.Router();
const Quotation = require("../models/quotation.models")
const Companies = require("../models/companies.models");

router.post("/qotation/create", async (req, res) => {
  try{
    let dataToSave = {
      quotationNumber: req.body.quotationNumber,
      companyId: req.body.companyId,
      projectName: req.body.projectName,
      submittedTo: req.body.submittedTo,
      currency: req.body.currency,
      sowNumber: req.body.sowNumber,
      divisionOfWork: req.body.divisionOfWork,
      revisionNumber: req.body.revisionNumber,
      dateOfQuotation: req.body.dateOfQuotation,
      inputDocReceived: req.body.inputDocReceived, 
      activities : req.body.activities
    }
    const quotation = await Quotation.create(dataToSave);
    console.log("quotation create datato save",dataToSave,"after save =====",quotation);
    res.status(200).json({quotation})

  }catch(err){
    res.status(500).json({ message: err.message });
  }
});

router.get("/quotation/get", async (req, res) => {
    try{
        const data = await Quotation.aggregate([ { $lookup: { from:"companies", localField:"companyId", foreignField:"_id",pipeline: [
          { $project: {"name":1}}], as:"companyDetails"}}])
        res.status(200).json(data)
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});

router.get("/quotation/list", async (req,res) => {
  try{
    const data = await Quotation.aggregate([ { $lookup: { from:"companies", localField:"companyId", foreignField:"_id",pipeline: [
      { $project: {"name":1}}], as:"companyDetails"}}]);
    
    console.log("quotation data",data);
    res.status(200).json(data);
  } catch(e){
    console.log("Error fetching quotation data: ", e);
  }
})

module.exports = router;
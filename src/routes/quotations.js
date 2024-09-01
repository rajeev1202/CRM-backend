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
    } catch(error){
        res.status(500).json({ message: error.message });
    }
});

router.get("/quotation/list", async (req,res) => {
  try{
    const data = await Quotation.aggregate([ { $lookup: { from:"companies", localField:"companyId", foreignField:"_id",pipeline: [
      { $project: {"name":1}}], as:"companyDetails"}}]);
    
    res.status(200).json(data);
  } catch(error){
    res.status(500).json({ message: error.message });  }
  });

router.get("/quotation/get/:companyId", async (req, res) => {
  try {
    const companyId = req.params.companyId
    const projectId = req.query.pid
    const data =  await Quotation.find({companyId,projectId},{quotationNumber:1, submittedTo: 1, divisionOfWork: 1,dateOfQuotation: 1})
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });  
  }
  });

module.exports = router;
const express = require("express")
const router = express.Router();
const Projects = require("../models/projects.models")

router.post("/projects/create", async (req, res) => {
  try{
    let dataToSave = {
        name: req.body.name,
        customerId: req.body.customerId
    }
    const projects = await Projects.create(dataToSave);
    console.log("project create data to save",dataToSave,"after save =====",projects);
    res.status(200).json({projects})

  }catch(err){
    res.status(500).json({ message: err.message });
  }
});

router.get("/projects/get", async (req, res) => {
    try{
        const data = await Projects.aggregate([ { $lookup: { from:"companies", localField:"customerId", foreignField:"_id",pipeline: [
          { $project: {"name":1}}], as:"companyDetails"}},
          { $lookup: { from:"quotations", localField:"quotationId", foreignField:"_id",pipeline: [
            { $project: {"dateOfQuotation":1}}], as:"quotationDetails"}}])
        res.status(200).json(data)
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
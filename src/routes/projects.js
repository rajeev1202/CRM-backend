const express = require("express")
const router = express.Router();
const Projects = require("../models/projects.models")
const mongoose = require("mongoose")

router.post("/projects/create", async (req, res) => {
  try{
    let dataToSave = {
        name: req.body.name,
        customerId: req.body.customerId
    }
    const projects = await Projects.create(dataToSave);
    res.status(200).json({projects})

  }catch(err){
    res.status(500).json({ message: err.message });
  }
});

router.get("/projects/get", async (req, res) => {
    try{
        const data = await Projects.aggregate([ { $lookup: { from:"companies", localField:"customerId", foreignField:"_id",pipeline: [
            { $project: {"name":1}}], as:"companyDetails"}},
            { $unwind : { path : "$quotationId" , "includeArrayIndex" : "rank"}},
            { $lookup: { from:"quotations", localField:"quotationId", foreignField:"_id", as:"quotationData"}},
        ])
        res.status(200).json(data)
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});

router.get("/projects/get/:customerId", async (req, res) => {
  try{
    const customerId = req.params.customerId;
    const data = await Projects.find({ 
      customerId: new mongoose.Types.ObjectId(customerId) });
    res.status(200).json(data)
  }catch(err){
    res.status(500).json({ message: err.message });
  }
})


module.exports = router;
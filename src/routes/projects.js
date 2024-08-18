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
    res.status(200).json({projects})

  }catch(err){
    res.status(500).json({ message: err.message });
  }
});

router.get("/projects/get", async (req, res) => {
    try{
        const data = await Projects.aggregate([ { $lookup: { from:"companies", localField:"customerId", foreignField:"_id",pipeline: [
            { $project: {"name":1}}], as:"companyDetails"}},
            { $unwind : { path : "$quotationId" , "includeArrayIndex" : "rank", "preserveNullAndEmptyArrays": true}},
            { $lookup: { from:"quotations", localField:"quotationId", foreignField:"_id", as:"quotationData"}},
        ])
        res.status(200).json(data)
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});

router.post("/projects/save", async (req, res) => {
  try{
    let data = {
      customerId: req.body.customerId,
      name: req.body.projectName,
    }
    const newProject = await Projects.create(data)
    res.status(200).json(newProject)
  } catch(err){
      res.status(500).json({ message: err.message });
  }
});


module.exports = router;
const express = require("express");
const PurchaseOrders = require("../models/purchase-orders.model");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get("/po/get", async (req, res) => {
  try {
    const data = await PurchaseOrders.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "_id",
          as: "projectDetails",
        },
      },
      {
        $lookup: {
          from: "quotations",
          localField: "quotationId",
          foreignField: "_id",
          as: "quotationDetails",
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "projectDetails.customerId",
          foreignField: "_id",
          as: "customerDetails",
        },
      },
      {
        $project: {
          "projectDetails._id": 1,
          "projectDetails.name": 1,
          "quotationDetails._id": 1,
          "quotationDetails.quotationNumber": 1,
          "customerDetails._id": 1,
          "customerDetails.name": 1,
          quotationId: 1,
          projectId: 1,
          purchaseOrderNumber: 1,
          purchaseOrderDoc: 1
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

router.post("/po/save",upload.single('poDoc'), async (req, res) => {
  try {
    const { poNumber, projectId, quotationId} = req.body;
      // Check if the file and fields are present
      const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = path.resolve(`./uploads/${file.filename}`)
    const dataToSave = {
      purchaseOrderNumber: poNumber,
      quotationId,
      projectId,
      purchaseOrderDoc: filePath
    };
    const purchaseOrder = await PurchaseOrders.create(dataToSave);
    res.status(200).json({
      message: 'File uploaded and data received successfully',
      file: file,
      fields: {
        poNumber,
        projectId,
        quotationId
      }});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

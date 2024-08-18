const express = require("express");
const PurchaseOrders = require("../models/purchase-orders.model");

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
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/po/save", async (req, res) => {
  try {
    const { poNumber, projectId, quotationId } = req.body;
    const dataToSave = {
      purchaseOrderNumber: poNumber,
      quotationId,
      projectId,
    };
    const purchaseOrder = await PurchaseOrders.create(dataToSave);
    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

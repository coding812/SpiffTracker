import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import authenticateToken from "./authenticate.js";
const router = express.Router();

// This section will help you get a list of all the sales with specific companyId
router.get("/", authenticateToken, async (req, res) => {
  if (!req.query.companyId) {
    res.status(400).send("Please provide a company id");
    return;
  }
  let collection = db.collection("sales");
  let query = { companyId: req.query.companyId };
  let results = await collection.find(query).toArray();
  console.log("sales.js line 16");
  console.table(results);
  res.status(200).send(results);
});

// This section will help you get a single record by id


// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    employeeName: req.body.employeeName,
    companyId: req.body.companyId,
    dateOfSale: req.body.dateOfSale,
    jobCompleted: req.body.jobCompleted,
    customerName: req.body.customerName,
    workOrder: req.body.workOrder,
    saleDescription: req.body.saleDescription,
    saleAmount: req.body.saleAmount,
    expectedCommission: req.body.expectedCommission,
  };

  let existingCompany = await db.collection("users").findOne({ companyId: req.body.companyId });

  if (!existingCompany) {
    console.log("sales.js line 39", `Company with ID ${req.body.companyId} does not exist`);
    return res.send("Company does not exist").status(404);
  }

  let collection = db.collection("sales");
  let result = await collection.insertOne(newDocument);
  console.table(newDocument);
  res.send(result).status(204);
  } 
);

// This section will help you update a record by id.
router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        employeeName: req.body.employeeName,
        companyId: req.body.companyId,
        dateOfSale: req.body.dateOfSale,
        jobCompleted: req.body.jobCompleted,
        customerName: req.body.customerName,
        workOrder: req.body.workOrder,
        saleDescription: req.body.saleDescription,
        saleAmount: req.body.saleAmount,
        expectedCommission: req.body.expectedCommission,
      },
    };

    let collection = db.collection("sales");
    let result = await collection.updateOne(query, updates);
    let updatedRecord = Object.entries(updates['$set']).map(([key, value]) => ({Property: key, Value: value}));
    console.table(updatedRecord);
    res.send(result).status(200);
  } 
  catch (err) 
  {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("sales");
    let result = await collection.deleteOne(query);
    console.table(result);
    res.send(result).status(200);
  } 
  catch (err) 
  {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;

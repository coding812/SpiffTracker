import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
const router = express.Router();

// This section will help you get a list of all the records with specific company_id
router.get("/", async (req, res) => {
  if (!req.query.companyId) {
    res.status(400).send("Please provide a company id");
    return;
  }
  let collection = db.collection("records");
  let query = { company_id: req.query.companyId };
  let results = await collection.find(query).toArray();
  // console.table(results);
  res.status(200).send(results);
});

// This section will help you get a single record by id


// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      employee_name: req.body.employee_name,
      company_id: req.body.company_id,
      date_of_sale: req.body.date_of_sale,
      job_completed: req.body.job_completed,
      customer_name: req.body.customer_name,
      work_order: req.body.work_order,
      sale_description: req.body.sale_description,
      sale_amount: req.body.sale_amount,
      expected_commission: req.body.expected_commission,
    };
    let collection = db.collection("records");
    let result = await collection.insertOne(newDocument);
    console.table(newDocument);
    res.send(result).status(204);
  } 
  catch (err) 
  {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        employee_name: req.body.employee_name,
        company_id: req.body.company_id,
        date_of_sale: req.body.date_of_sale,
        job_completed: req.body.job_completed,
        customer_name: req.body.customer_name,
        work_order: req.body.work_order,
        sale_description: req.body.sale_description,
        sale_amount: req.body.sale_amount,
        expected_commission: req.body.expected_commission,
      },
    };

    let collection = db.collection("records");
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
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("records");
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

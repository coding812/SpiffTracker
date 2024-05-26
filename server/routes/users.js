import express from "express";

// Importing the MongoDB connection from the connection file
import db from "../db/connection.js";

import { CURSOR_FLAGS, ObjectId } from "mongodb";

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
    try {
        let collection = db.collection("users");
        let query = { email: req.body.email, password: req.body.password };
        console.log(`Attempting to find user with email: ${req.body.email}`);
        let result = await collection.findOne(query);
        if (!result) {
            res.send("Not found").status(404)
            console.log(`User with email ${req.body.email} not found`);
        }
        else {
            res.send(result).status(200)
            console.log(`User with email ${req.body.email} found, successfully logged in`);
        };
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

// Register route
router.post("/register", async (req, res) => 
    {
    try 
    {
        let newDocument = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            companyId: req.body.companyId,
        };
        let collection = db.collection("users");
        let result = await collection.insertOne(newDocument);
        console.table(newDocument);
        res.send(result).status(204);
        console.log(`New user registered with email: ${req.body.email}`);
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send("Error registering user");
    }
});

export default router;
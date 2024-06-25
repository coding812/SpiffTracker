import express from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

import bcrypt from "bcrypt";
const saltRounds = 10;

dotenv.config();
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
    try {
        let collection = db.collection("users");
        let user = await collection.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).send("Not found")
        }

        let passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).send("Invalid password")
        };
        const accessToken = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "1800s"}) 
        const jwtExpiration = 1800;
        res.status(200).send({user, accessToken, jwtExpiration})
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

// Register route
router.post("/register", async (req, res) => {
    try 
    {
        let newDocument = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, saltRounds),
            companyId: req.body.companyId,
        };

        let existingUser = await db.collection("users").findOne({ email: req.body.email });
        let existingCompany = await db.collection("users").findOne({ companyId: req.body.companyId });

        if (existingUser && existingCompany) {
            console.log("user.js line 56", `User with email ${req.body.email} and company with ID ${req.body.companyId} already exist`);
            return res.status(409).json({ error: "User and company already exist" });
        } 
        else if (existingUser) {
            console.log("user.js line 56", `User with email ${req.body.email} already exists`);
            return res.status(409).json({error: "User already exists"});
        } 
        else if (existingCompany) {
            console.log("user.js line 56", `Company with that ID already exists`);
            return res.status(409).json({error: "Company already exists"});
        }

        let collection = db.collection("users");
        let result = await collection.insertOne(newDocument);
        console.table(newDocument);
        res.status(204).send(result);
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).send("Error registering user");
    }
});

export default router;
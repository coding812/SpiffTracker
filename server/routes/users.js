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
        console.log(`Attempting to find user with email: ${req.body.email}`);

        if (!user) {
            console.log(`User with email ${req.body.email} not found`);
            return res.send("Not found").status(404)
        }

        let passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            console.log(`User with email ${req.body.email} found, but password is incorrect`);
            return res.send("Invalid password").status(401)
        };
        const accessToken = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "3hrs"})
        res.status(200).send({user, accessToken})
        console.log(`User with email ${req.body.email} found, successfully logged in`);
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
            password: bcrypt.hashSync(req.body.password, saltRounds),
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
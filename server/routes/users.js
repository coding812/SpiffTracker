import express from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import {FrontendUrl} from '../../client/src/components/BaseUrl.js';

import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_EMAIL_PASSWORD
    }
});

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

// Forgot password email request route
router.post("/forgot-password", async (req, res) => {
    try {
        let collection = db.collection("users");
        let user = await collection.findOne({ email: req
        .body.email });
        if (!user) {
            return res.status(404).json("User with that email not found");
        }

        let email = process.env.APP_EMAIL;
        let token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        let url = `${FrontendUrl}password-reset/${token}`;
        
        let mailOptions = {
            from: email,
            to: user.email,
            subject: 'Password Reset',
            html: `<h1>Click <a href="${url}">here</a> to reset your password</h1>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json(error, "Error sending email");
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json("Email sent");
        });
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Error resetting password");
    }
});

// Password reset route
router.post("/password-reset/:token", async (req, res) => {
    try {
        let token = req.params.token;
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let collection = db.collection("users");
        let user = await collection.findOne({ _id: ObjectId(decoded.userId) });
        if (!user) {
            return res.status(404).json("User not found");
        }
        let newPassword = await bcrypt.hash(req.body.password, saltRounds);
        let result = await collection.updateOne({ _id: ObjectId(decoded.userId) }, { $set: { password: newPassword } });
        res.status(204).send(result);
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Error resetting password");
    }
});
    


export default router;
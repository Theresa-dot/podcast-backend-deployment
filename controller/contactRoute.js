const express = require("express");
const contactSchema = require("../model/contactSchema");
const axios=require('axios')
const contactRoute = express.Router();

contactRoute.post("/contact", (req, res) => {
    contactSchema.create(req.body, (err, data) => {
        if (err) {
            // Handle the error, e.g., send an error response
            return res.status(500).json({ error: 'Error creating contact', details: err });
        } else {
            res.json(data);
        }
    });
});

contactRoute.get("/", (req, res) => {
    contactSchema.find((err, data) => {
        if (err)
            return err;
        else
            res.json(data);
    });
});

module.exports = contactRoute;

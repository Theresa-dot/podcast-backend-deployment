const express = require("express");
const registerSchema = require("../model/registerSchema");
const axios=require('axios')
const registerRoute = express.Router();




registerRoute.post("/create-registrant", (req, res) => {
    const { name, password } = req.body;
    registerSchema.findOne({ name: name })
        .then(user => {
            if (user) {
                res.json("User already exists");
            } else {
                // If user doesn't exist, create a new one
                registerSchema.create(req.body, (err, data) => {
                    if (err)
                        return err;
                    else
                        res.json(data);
                });
            }
        });
});


registerRoute.post("/login-registrant", (req, res) => {
    const { name, password } = req.body;
    registerSchema.findOne({ name: name })
        .then(user => {
            if (user) {
                if (user.password === password)
                    res.json("Success");
                else
                    res.json("Password is incorrect");
            } else {
                res.json("No record existed");
            }
        });
});

registerRoute.get("/", (req, res) => {
    registerSchema.find((err, data) => {
        if (err)
            return err;
        else
            res.json(data);
    });
});

registerRoute.route("/update-registrant/:id")
    .get((req, res) => {
        registerSchema.findById(req.params.id, (err, data) => {
            if (err)
                return err;
            else
                res.json(data);
        });
    })
    .put((req, res) => {
        registerSchema.findByIdAndUpdate(req.params.id, { $set: req.body },
            (err, data) => {
                if (err)
                    return err;
                else
                    res.json(data);
            });
    });

registerRoute.delete("/delete-registrant/:id", (req, res) => {
    registerSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (err)
            return err;
        else
            res.json(data);
    });
});

module.exports = registerRoute;

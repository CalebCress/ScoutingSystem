const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();
const dbo = require('../db/conn');
const dbConnect = dbo.getDb();

recordRoutes.route("/submit").post(async (req, res) => {
    let data = {
        teamNumber: req.body.teamNumber,
        scout: req.body.scout,
        data: req.body.data,
        eventId: req.body.eventId
    }
    dbConnect.collection("data").insertOne(data, (err, response) => {
        if (err) {
            res.status(400).send({
                err,
                message: "failed to submit data"
            })
        }
    })
})

recordRoutes.route("/addteam").post(async (req, res) => {
    if (req.body.number === nil || req.body.name === nil) {
        res.status(400).send({
            message: "must include number and name in body"
        })
    }
    let team = {
        number: req.body.number,
        name: req.body.name
    }
    dbConnect.collection("teams").insertOne(team, (err, response) => {
        if (err) {
            res.status(400).send({
                err,
                message: "failed to add team"
            })
        }
    })
})



module.exports = recordRoutes;
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();
const dbo = require('../db/conn');


recordRoutes.route("/submit").post(async (req, res) => {
    const dbConnect = dbo.getDb();
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
    res.sendStatus(200)
})

recordRoutes.route("/addteam").post(async (req, res) => {
    const dbConnect = dbo.getDb();
    let team = {
        number: req.body.number,
        name: req.body.name
    }
    dbConnect.collection("teams").insertOne(team, (err, response) => {
        if (err) {
            res.status(400).send("failed to add team")
        }
    })
    res.sendStatus(200)
})

recordRoutes.route("/addevent").post(async (req, res) => {
    const dbConnect = dbo.getDb();
    let id = 1
    dbConnect.collection("events").find({}).toArray((err, result) => {
        if (err) {
            res.status(400).send("Error fetching events");
        } else {
            result.forEach(event => {
                if (event.id > id) {
                    id = event.id+1
                }
            });
        }
    })

    let event = {
        id: id,
        name: req.body.name,
        number: req.body.number
    }
    dbConnect.collection("events").insertOne(event, (err, result) => {
        if (err) {
            res.status(400).send("failed to add event")
        }
    })
    res.sendStatus(200)
})

module.exports = recordRoutes;
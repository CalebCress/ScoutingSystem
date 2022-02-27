const express = require("express")
const { json } = require("express/lib/response")

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router()
const dbo = require('../db/conn')


recordRoutes.route("/submit").post(async (req, res) => {
    const dbConnect = dbo.getDb()
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
    const dbConnect = dbo.getDb()
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
    const dbConnect = dbo.getDb()
    let id = 1
    dbConnect.collection("events").find({}).toArray((err, result) => {
        if (err) {
            res.status(400).send("Error fetching events")
        } else {
            result.forEach(event => {
                if (event.id > id) {
                    id = event.id+1
                }
            })
        }
    })

    let event = {
        id: id,
        name: req.body.name,
        teams: req.body.teams
    }
    dbConnect.collection("events").insertOne(event, (err, result) => {
        if (err) {
            res.status(400).send("failed to add event")
        }
    })
    res.sendStatus(200)
})

recordRoutes.route("/eventteam").post((req, res) => {
    const dbConnect = dbo.getDb()
    //Check if team and event exists here
    dbConnect.collection("events").updateOne(
        {event: eventId}, 
        {
            $push: {
                teams: req.body.number
            }
    })
    res.sendStatus(200)
})

recordRoutes.route("/teamdata").post((req, res) => {
    const dbConnect = dbo.getDb()
    if (req.body.eventId === 0) {
        dbConnect.collection("data").find({teamNumber: req.body.teamNumber}).toArray(function (err, result) {
            if (err) {
              res.status(400).send("Error fetching listings!")
           } else {
              res.json(result)
            }
        })
    } else {
        dbConnect.collection("data").find({teamNumber: req.body.teamNumber, eventId: req.body.eventId}).toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching listings!")
            } else {
                res.json(result)
            }
        })
    }
    res.sendStatus(200)
})

recordRoutes.route("/events").get((req, res) => {
    const dbConnect = dbo.getDb()

    dbConnect.collection("events").find({}).toArray((err, result) => {
        if (err) {
            res.status(400).send("Error fetching events!")
        } else {
            res.json(result)
        }
    })
    res.sendStatus(200)
})

recordRoutes.route("/event").get((req, res) => {
    const dbConnect = dbo.getDb()

    dbConnect.collection("events").find({id: req.body.eventId}).toArray((err, result) => {
        if (err) {
            res.status(400).send("Error fetching events!")
        } else {
            res.json(result)
        }
    })
    res.sendStatus(200)
})

recordRoutes.route("/all").get((req, res) => {
    const dbConnect = dbo.getDb()
    let all = {
        data:[],
        events:[],
        teams:[]
    }

    dbConnect.collection("data").find({}).toArray((err, result) => {
        if (err) {
            res.status(400).send("Error getting data")
        } else {
            all.data = result
            dbConnect.collection("events").find({}).toArray((err, result) => {
                if (err) {
                    res.status(400).send("Error getting data")
                } else {
                    all.events = result
                    dbConnect.collection("teams").find({}).toArray((err, result) => {
                        if (err) {
                            res.status(400).send("Error getting data")
                        } else {
                            all.teams = result
                            res.send(all)
                        }
                    })
                }
            })
        }
    })
    res.sendStatus(200)
})

recordRoutes.route("/addnote").post((req, res) => {
    const dbConnect = dbo.getDb()
    let insertData = req.body
    if (insertData.name === undefined) {
        insertData.name = "note"
    }
    dbConnect.collection("notes").insertOne(insertData, (err, result) => {
        if (err) {
            res.status(400).send(err)
        }
    })
    res.sendStatus(200)
})

recordRoutes.route("/notes").get((req, res) => {
    const dbConnect = dbo.getDb()

    dbConnect.collection("notes").find({}).toArray((err, result) => {
        if (err) {
            res.status(400).send(err)
        }
        res.send(result)
    })
})

recordRoutes.route("/queue").post((req, res)=> {
    const dbConnect = dbo.getDb()
    let roundNumber = req.body.roundNumber
    let eventId = req.body.eventId

    req.body.queue.forEach((queue)=> {
        let doc = {
            scoutId: queue.scoutId,
            eventId: eventId,
            roundNumber: roundNumber,
            teamNumber: queue.teamNumber
        }
        dbConnect.collection("scoutingLog").insertOne(doc, (err, result) => {
            if (err) {
                res.status(400).send(err)
            }
        })
    })
    res.send(200)
})

recordRoutes.route("/roundQueue").post((req, res) => {
    const dbConnect = dbo.getDb()

    let query = {
        roundNumber: req.body.roundNumber,
        eventId: req.body.eventId
    }

    dbConnect.collection("scoutingLog").find(query).toArray((err, result) => {
        if (err) {
            res.status(400).send(err)
        }
        res.send(result)
    })
})



module.exports = recordRoutes
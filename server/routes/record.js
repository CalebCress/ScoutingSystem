const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

recordRoutes.route("/submit").get(async function (req, res) {
    const dbConnect = dbo.getDb();
    let id

    dbConnect.collection("teams").findOne({number: req.body.teamNumber}, (err, result) => {
        if (err) throw err;
        id = result.id
    })
    let data = {
        teamId: id,
        scout: res.scout,
        data: res.data,
        eventId: res.eventId
    }
    dbConnect.collection("data").insertOne(data, (err, res) => {
        if (err) throw err;
        console.log("1 document inserted")
        db.close()
    })
})
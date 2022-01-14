const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();
const dbo = require('../db/conn');


recordRoutes.route("/submit").get(async function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect.collection("data").insertOne(req.body, (err, response) => {
        if (err) {
            res.status(400).send({
                err,
                message: "failed to submit data"
            })
        }
        db.close()
    })
})



module.exports = recordRoutes;
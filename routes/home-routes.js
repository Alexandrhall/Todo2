const express = require("express");
const database = require("../data/database.js");
const middleWare = require("../data/utils.js");

const router = express.Router();

router.get(
    "/",
    async (req, res, next) => {
        middleWare(req, res, next);
    },
    async (req, res, next) => {
        const tasks = await database.getTodo();
        res.render("home", { tasks });
    }
);

router.post(
    "/",
    async (req, res, next) => {
        middleWare(req, res, next);
    },
    async (req, res) => {
        let dateNow = JSON.stringify(new Date());

        if (req.body.description != "") {
            const newTask = {
                created: dateNow,
                description: req.body.description,
                done: false,
            };
            const db = await database.getDb();
            await db.collection("tasks").insertOne(newTask);
        }

        res.redirect("/");
    }
);

module.exports = router;

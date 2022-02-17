const express = require("express");
const exphbs = require("express-handlebars");
const database = require("../database.js");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = ObjectId(req.params.id);
    const db = await database.getDb();
    const tasks = await database.getTodo();

    await db.collection("tasks").findOne({ _id: id }, async (req, task) => {
        res.render("edit-name", { tasks, task, id });
    });
});

router.post("/:id", async (req, res) => {
    const id = ObjectId(req.params.id);
    const db = await database.getDb();

    if (req.body.description != "") {
        await db
            .collection("tasks")
            .updateOne(
                { _id: id },
                { $set: { description: req.body.description } }
            );
    }

    res.redirect("/");
});

module.exports = router;

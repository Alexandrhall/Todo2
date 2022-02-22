const express = require("express");
const exphbs = require("express-handlebars");
const database = require("../data/database.js");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = ObjectId(req.params.id);
    const db = await database.getDb();

    await db.collection("tasks").findOne({ _id: id }, async (err, task) => {
        const updateTask = {
            done: !task.done,
        };
        await db
            .collection("tasks")
            .updateOne({ _id: id }, { $set: { done: !task.done } });
        res.redirect("/");
    });
});

module.exports = router;

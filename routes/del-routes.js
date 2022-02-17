const express = require("express");
const exphbs = require("express-handlebars");
const database = require("../database.js");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = ObjectId(req.params.id);
    const db = await database.getDb();

    await db.collection("tasks").deleteOne({ _id: id });

    res.redirect("/");
});

module.exports = router;

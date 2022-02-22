const express = require("express");
const exphbs = require("express-handlebars");
const database = require("../data/database.js");

const router = express.Router();

router.get("/", async (req, res) => {
    res.redirect(req.query.showDone);
});

router.get("/done", async (req, res) => {
    const tasks = await database.getTodo();
    res.render("done-list", { tasks });
});

router.get("/undone", async (req, res) => {
    const tasks = await database.getTodo();
    res.render("undone-list", { tasks });
});

module.exports = router;

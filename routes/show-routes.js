const express = require("express");
const exphbs = require("express-handlebars");
const db = require("../database.js");

const router = express.Router();

router.get("/", async (req, res) => {
    res.redirect(req.query.showDone);
});

router.get("/done", async (req, res) => {
    const tasks = await db.getTodo();
    res.render("done-list", { tasks });
});

router.get("/undone", async (req, res) => {
    const tasks = await db.getTodo();
    res.render("undone-list", { tasks });
});

module.exports = router;

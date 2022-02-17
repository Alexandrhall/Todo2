const express = require("express");
const exphbs = require("express-handlebars");
const database = require("../database.js");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect(req.query.sortList);
});

router.get("/name", async (req, res) => {
    const list = await database.getTodo();

    list.sort(function (a, b) {
        let nameA = a.description.toUpperCase();
        let nameB = b.description.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    res.render("sort-list", { list });
});

router.get("/dateold", async (req, res) => {
    const list = await database.getTodo();

    list.sort(function (a, b) {
        let nameA = a.created;
        let nameB = b.created;
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    res.render("sort-list", { list });
});

router.get("/datefirst", async (req, res) => {
    const list = await database.getTodo();

    list.sort(function (a, b) {
        let nameA = a.created;
        let nameB = b.created;
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        return 0;
    });

    res.render("sort-list", { list });
});

module.exports = router;

const express = require("express");
const exphbs = require("express-handlebars");
const database = require("../database.js");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect(req.query.sortList);
});

router.get("/name", async (req, res) => {
    const id = ObjectId(req.params.id);
    const list = await database.getTodo();
    const db = await database.getDb();

    // await db.collection("tasks").aggregate([
    //     {
    //         $sort: { description: 1 },
    //     },
    // ]);

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

    await db.collection("tasks").updateMany(list);

    res.redirect("/");
    // await db.find().sort({ description: 1 });

    // await db.collection("tasks").updateMany(result);
});

router.get("/dateold", async (req, res) => {
    const id = ObjectId(req.params.id);
    const db = await database.getDb();

    await db
        .collection("tasks")
        .find({})
        .sort({ _id: 1, created: -1, description: 1, done: 1 });

    // const test = await db.collection("tasks").find({}).sort({ created: 1 });
    // await db.collection("tasks").updateMany(test);
    // console.log(test);
    // const tasks = await db.getTodo();
    // tasks.sort(function (a, b) {
    //     let nameA = a.created;
    //     let nameB = b.created;
    //     if (nameA < nameB) {
    //         return -1;
    //     }
    //     if (nameA > nameB) {
    //         return 1;
    //     }
    //     return 0;
    // });
    res.redirect("/");
});

router.get("/datefirst", async (req, res) => {
    const id = ObjectId(req.params.id);
    const db = await database.getDb();

    const tasks = await db
        .collection("tasks")
        .find()
        .sort({ created: 1 })
        .toArray();

    console.log(tasks);

    res.render("sort-list", { tasks });

    // const tasks = await db.getTodo();
    // tasks.sort(function (a, b) {
    //     let nameA = a.created;
    //     let nameB = b.created;
    //     if (nameA > nameB) {
    //         return -1;
    //     }
    //     if (nameA < nameB) {
    //         return 1;
    //     }
    //     return 0;
    // });
});

module.exports = router;

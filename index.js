const express = require("express");
const exphbs = require("express-handlebars");
const database = require("./database.js");
const { ObjectId } = require("mongodb");
const middleWare = require("./utils.js");

const checkedRoutes = require("./routes/checked-routes.js");
const editRoutes = require("./routes/edit-routes.js");
const delRoutes = require("./routes/del-routes.js");
const showRoutes = require("./routes/show-routes.js");
const sortRoutes = require("./routes/sort-routes.js");

const app = express();

app.engine(
    "hbs",
    exphbs.engine({
        defaultLayout: "main",
        extname: ".hbs",
    })
);

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    // async (req, res, next) => {
    //     const date = Date.now().toString();
    //     console.log(
    //         `Request Type: ${req.method}`,
    //         `From: ${req.socket.remoteAddress} `,
    //         `Time: ${date}`
    //     );

    //     next();
    // },
    async (req, res, next) => {
        middleWare(req, res, next);
    },
    async (req, res, next) => {
        const tasks = await database.getTodo();
        res.render("home", { tasks });
    }
);

app.post("/", async (req, res) => {
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
});

app.use("/checked", checkedRoutes);

app.use("/edit", editRoutes);

app.use("/del", delRoutes);

app.use("/show", showRoutes);

app.use("/sort", sortRoutes);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});

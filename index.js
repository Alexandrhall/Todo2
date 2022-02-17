const express = require("express");
const exphbs = require("express-handlebars");

const checkedRoutes = require("./routes/checked-routes.js");
const editRoutes = require("./routes/edit-routes.js");
const delRoutes = require("./routes/del-routes.js");
const showRoutes = require("./routes/show-routes.js");
const sortRoutes = require("./routes/sort-routes.js");
const homeRoutes = require("./routes/home-routes.js");

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

app.use("/", homeRoutes);

app.use("/checked", checkedRoutes);

app.use("/edit", editRoutes);

app.use("/del", delRoutes);

app.use("/show", showRoutes);

app.use("/sort", sortRoutes);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});

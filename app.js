//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const date = require(__dirname + "/date.js");

const items = []; 

const workItems = [];


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {

    const day = date.getDate();

    res.render('index', {
        ListTitle: day,
        ListItem: items
    });

});

app.get("/work", function (req, res) {
    res.render('index', {
        ListTitle: "Work",
        ListItem: workItems
    });
});

app.post("/", function (req, res) {

    const item = req.body.item;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");

    } else {
        items.push(item);
        res.redirect("/");
    }

});




app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Your server is running on port 3000");
});
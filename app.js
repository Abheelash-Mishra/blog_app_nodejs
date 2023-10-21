const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

require('dotenv').config();

const blogRoutes = require("./routes/blogRoutes");

const app = express();
const port = 3001;

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("Connected to DB");
        app.listen(port);
    })
    .catch((err) => {
        console.log(err)
    })

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.use(morgan("dev"));



app.get("/", (req, res) => {
    // res.render("index", {title: "Home"});
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", {title: "About Us"});
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
    res.status(404).render("404", {title: "404"});
});


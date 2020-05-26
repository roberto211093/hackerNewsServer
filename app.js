const express = require("express");
const bodyParse = require("body-parser");

const app = express();
const {API_VERSION} = require("./config");

// Load Routings
const newsRoutes = require('./routers/news');

app.use(bodyParse.urlencoded({extended: false}))
app.use(bodyParse.json())

// Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// Router Basic
app.use(`/api/${API_VERSION}`, newsRoutes);

module.exports = app;

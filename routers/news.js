const express = require("express");
const NewsController = require("../controllers/news");
const api = express.Router();

api.get("/news", NewsController.getNews);
api.post("/news", NewsController.saveNews);

module.exports = api;

const express = require("express");
const NewsController = require("../controllers/news");
const api = express.Router();

api.post("/news", NewsController.saveNews);
api.post("/delete-news", NewsController.deleteNews);
api.get("/news", NewsController.getNews);

module.exports = api;

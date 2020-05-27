const express = require("express");
const NewsController = require("../controllers/news");
const api = express.Router();

api.get("/getNewsHn", NewsController.getNewsHn);
api.post("/delete-news", NewsController.deleteNews);
api.get("/news", NewsController.getNews);

module.exports = api;

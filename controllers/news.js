const News = require("../models/news")

const saveNews = async (req, res) => {

    try {
        const objectNews = req.body
        objectNews.hits.forEach((news) => {
            const {title, story_title, url, story_url, author, created_at, objectID} = news;
            if(!title && !story_title){
                return;
            }
            if(!url && !story_url){
                return;
            }
            const objNew = {
                title: title ? title : story_title,
                url: url ? url : story_url,
                author: author,
                created_at: created_at,
                objectID: objectID
            }
            News.create(objNew);
        });

        res.status(201).send({message: "Success"});
    } catch (error) {
        res.status(500).send({message: "Error del servidor"});
    }
}

const getNews = async (req, res) => {
    try{
        const news = await News.find()
        if (!news) {
            res.status(404).send({message: "No existen noticias"});
        } else {
            res.status(200).send({news: news, message: "Success"});
        }
    } catch (error) {
        res.status(500).send({message: "Error del servidor"});
    }
}

module.exports = {
    getNews,
    saveNews
}

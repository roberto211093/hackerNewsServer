const News = require("../models/news")
const Users = require("../models/users")
const request = require('request');

const getNewsHn = async (req, res) => {
    try {
        await request('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', {json: true}, (e, r, body) => {
            if (e) {
                res.status(500).send({message: "Error del servidor"});
            }
            const objectNews = body.hits;
            objectNews.forEach((news, index) => {
                const {title, story_title, url, story_url, author, created_at, objectID} = news;
                if (!title && !story_title) {
                    return;
                }
                if (!url && !story_url) {
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
        });
        res.status(201).send({message: "Success"});
    } catch (error) {
        res.status(500).send({message: "Error del servidor"});
    }
}

const deleteNews = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(403).send({message: "Peticion no tiene headers de Auth."});
    }
    const {idNews} = req.body;
    const token = req.headers.authorization.replace(/['"]+/g, "");
    try {
        const user = await Users.findOne({token});
        user.idNewsDeleted.push(idNews);
        user.save();
        res.status(200).send({message: "Success"});
    } catch (error) {
        res.status(500).send({message: "Error del servidor"});
    }
}

const getNews = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(403).send({message: "Peticion no tiene headers de Auth."});
    }
    const token = req.headers.authorization.replace(/['"]+/g, "");
    let dataUser = {
        token,
        idNewsDeleted: []
    }
    try {
        const news = await News.find().sort({created_at: 'desc'});
        const user = await Users.findOne({token});
        if (!!!user) {
            Users.create(dataUser);
        }
        if (news.length === 0) {
            res.status(404).send({message: "No existen noticias"});
        } else {
            let newToReturn = news;
            if (user) {
                const {idNewsDeleted} = user;
                if (idNewsDeleted.length > 0) {
                    newToReturn = news.filter((element) => !idNewsDeleted.includes(element.objectID));
                }
            }
            res.status(200).send({news: newToReturn, message: "Success"});
        }
    } catch (error) {
        res.status(500).send({message: "Error del servidor"});
    }
}

module.exports = {
    getNewsHn,
    deleteNews,
    getNews
}

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = Schema({
    title: String,
    url: String,
    author: String,
    created_at: String,
    objectID: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model("news", NewsSchema);

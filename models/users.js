const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = Schema({
    token: {
        type: String,
        unique: true
    },
    idNewsDeleted: []
})

module.exports = mongoose.model("users", UsersSchema);

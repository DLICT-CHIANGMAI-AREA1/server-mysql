const mongoose = require("../config/database");
const Schema = mongoose.Schema;

const footer = new Schema({
    data: Array,
});

const Footer = mongoose.model("other", footer);

module.exports = Footer;

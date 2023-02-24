const mongoose = require("../config/database");
const Schema = mongoose.Schema;

const news = new Schema({
    Headline: String,
    content: String,
    image_title_url: Array,
    images: Array,
    DateTime: String,
    type: String,
});

const News = mongoose.model("news", news);

module.exports = News;

const mongoose = require("../config/database");
const Schema = mongoose.Schema


const youtube_video = new Schema({
    url:String,
})

const YoutubeVideo = mongoose.model(" youtube_video",  youtube_video)


module.exports = YoutubeVideo
const mongoose = require("../config/database");
const Schema = mongoose.Schema


const service_title = new Schema({
    title:String,
    subtitle:String,
    type:String,
})

const ServiceTitle = mongoose.model("service_title", service_title)


module.exports = ServiceTitle
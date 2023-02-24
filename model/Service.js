const mongoose = require("../config/database");
const Schema = mongoose.Schema


const service = new Schema({
    name:String,
    url:String,
    image:String,
    type:String,
})

const Service = mongoose.model("service", service)


module.exports = Service
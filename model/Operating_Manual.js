const mongoose = require("../config/database");
const Schema = mongoose.Schema


const operating_manual = new Schema({
    url:String,
    filename:String
})

const OP = mongoose.model("operating_manuals", operating_manual)


module.exports = OP
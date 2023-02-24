const mongoose = require("../config/database");
const Schema = mongoose.Schema


const mission = new Schema({
    text:String,
})

const Mission = mongoose.model(" Mission",  mission)


module.exports = Mission
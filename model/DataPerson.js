const mongoose = require("../config/database");
const Schema = mongoose.Schema;

const Person = new Schema({
    First_name: String,
    Last_name:String,
    Gender: String,
    Job_title: String,
    Department: String,
    Email: String,
    Phone: String,
    Operating_Manual: String,
    Profile: String,
    Positions: String

});

const DataPerson = mongoose.model(" Person", Person);
module.exports = DataPerson;

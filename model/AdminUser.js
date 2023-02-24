const mongoose = require("../config/database");
const Schema = mongoose.Schema;

const AdminUser = new Schema({
    username: String,
    password: String
});

const Admin_user = mongoose.model(" AdminUser", AdminUser);
module.exports = Admin_user;

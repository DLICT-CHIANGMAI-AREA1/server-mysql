const mongoose = require("../config/database");
const Schema = mongoose.Schema;
const mock = require("../model/JSON/mock.json");

const Data_Each_Year = new Schema({
    name_year: String,
    data: [
        {
            name_data: String,
            icon: String,
            date: [
                {
                    name_date: String,
                    data: [{ name: String, url: String, csv: String, pdf: String }],
                },
            ],
        },
    ],
});

const DataEachYear = mongoose.model(" Data_Each_Year", Data_Each_Year);

const SaveDataStudent = async () => {
    if (0 == (await DataEachYear.find())) await DataEachYear.insertMany(mock);
};
SaveDataStudent();

module.exports = DataEachYear;

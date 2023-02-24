const OP = require("../model/Operating_Manual");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const admin = require("firebase-admin");

module.exports = {
    CreatePDF: async (req, res, next) => {
        try {
            const { filename } = req.body;

            let op = new OP({ filename: filename, url: req.file.firebaseUrl });
            op.save()
                .then((response) => {
                    return res.status(200).json(response);
                })
                .catch((error) => {
                    return res.status(500).json(error.message);
                });
        } catch (error) {
            res.json({ message: error.message });
        }
    },
    UpdateOPM: async (req, res, next) => {
        try {
            let { id } = req.params;
            const find = await OP.find({ _id: id });
            const bucket = admin.storage().bucket();
            const filePath = find[0].url.split("/").slice(-2).join("/");
            const file = bucket.file(filePath);
            const data = { filename: "operation", url: req.file.firebaseUrl };
            file.exists().then(async (exists) => {
                if (exists) {
                    file.delete();
                    let update = await OP.findByIdAndUpdate(id, data, { new: true });
                    return res.status(200).json(update);
                } else {
                    console.log("File does not exist");
                }
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    FindOP: async (req, res, next) => {
        try {
            res.status(200).json(await OP.find());
        } catch (error) {
            res.status(500).json(error);
        }
    },
    DeleteOPM: async (req, res, next) => {
        try {
            const { id } = req.params;
            await OP.findByIdAndDelete(id);
            return res.status(200).json(await OP.find());
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
};

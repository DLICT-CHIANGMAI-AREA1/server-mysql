const Mission = require("../model/Mission");
module.exports = {
    AddMission: async (req ,res, next) => {
        try {
            let data = req.body;
            let mission = new Mission(data);
            await mission.save(async (err, data) => {
                if (err) return res.status(400).json("Bad Request");
                return res.status(200).json(data);
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    FindMission: async (req, res, next) => {
        try {
            res.status(200).json(await Mission.find());
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    DeleteMission: async (req, res, next) => {
        try {
            const { id } = req.params;
            return res.status(200).json(await Mission.findByIdAndDelete(id));
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
};

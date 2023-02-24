const Video = require("../model/YoutubeVideo");
module.exports = {
    AddVideo: async (req, res, next) => {
        try {
            let data = req.body;
            let video = new Video(data);
            await video.save(async (err, data) => {
                if (err) return res.status(400).json("Bad Request");
                return res.status(200).json(data);
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    FindVideo: async (req, res, next) => {
        try {
            res.status(200).json(await Video.find());
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    DeleteVideo: async (req, res, next) => {
        try {
            const { id } = req.params;
            return res.status(200).json(await Video.findByIdAndDelete(id));
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
};

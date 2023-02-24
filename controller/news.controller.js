const News = require("../model/News");

module.exports = {
    AddNews: async (req, res, next) => {
        try {
            let news = new News(req.body);
            await news.save(async (err, data) => {
                if (err) return res.status(400).json("Bad Request");
                return res.status(200).json(data);
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    FindNews: async (req, res, next) => {
        try {
            res.status(200).json(await News.find());
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    FindNewsById: async (req, res, next) => {
        try {
            const { param } = req.params;
            res.status(200).json(await News.findById(param));
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    DeleteNews: async (req, res, next) => {
        try {
            const { id } = req.params;
            return res.status(200).json(await News.findByIdAndDelete(id));
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    UpdateNews: async (req, res, next) => {
        try {
            const { Id } = req.params;
            let update = await News.findByIdAndUpdate(Id, req.body, { new: true });
            return res.status(200).json(update);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
};

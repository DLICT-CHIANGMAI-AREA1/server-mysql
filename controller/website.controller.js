const Footer = require("../model/footer");
module.exports = {
    AddFooter: async (req, res, next) => {
        try {
            let footer = new Footer({ data: req.body });
            await footer.save(async (err, data) => {
                if (err) return res.status(400).json("Bad Request");
                return res.status(200).json(data);
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    editFooter: async (req, res, next) => {
        try {
            const { Id } = req.params;
            let update = await Footer.findByIdAndUpdate(Id, { data: req.body }, { new: true });
            return res.status(200).json(update);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    findFooter: async (req, res, next) => {
        try {
            res.status(200).json(await Footer.find());
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    AddLink: async (req, res, next) => {
        try {
            let social = new Footer({ data: req.body });
            await social.save(async (err, data) => {
                if (err) return res.status(400).json("Bad Request");
                return res.status(200).json(data);
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    GetLink: async (req, res, next) => {
        try {
            res.status(200).json(await Footer.find());
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    EditLink: async (req, res, next) => {
        try {
            const { Id } = req.params;
            let update = await Footer.findByIdAndUpdate(Id, { data: req.body }, { new: true });
            return res.status(200).json(update);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    AddTitleBanner: async (req, res, next) => {
        try {
            let Title = new Footer({ data: req.body });
            await Title.save(async (err, data) => {
                if (err) return res.status(400).json("Bad Request");
                return res.status(200).json(data);
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    EditTitleBanner: async (req, res, next) => {
        try {
            const { Id } = req.params;
            let update = await Footer.findByIdAndUpdate(Id, { data: req.body }, { new: true });
            return res.status(200).json(update);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
};

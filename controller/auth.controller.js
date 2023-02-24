const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const Admin_User = require("../model/AdminUser");


module.exports = {
    register: async (req, res, next) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Store the user in the database
            const user = {
                username: req.body.username,
                password: hashedPassword,
            };

            const admin = new Admin_User(user);
            await admin.save;
            await admin.save(async (err, data) => {
                if (err) {
                    res.status(400).json({ message: "Username that other User has already exist" });
                } else {
                    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    });
                    res.send({ token });
                }
            });
            // Save the user to the database...
            // Generate a JSON Web Token for the user
        } catch (error) {
            res.json({ message: error.message });
        }
    },
    login: async (req, res, next) => {
        try {
            const expiresIn = '1h';
            const getUser = req.body;
            const user = await Admin_User.findOne({ getUser });
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.send({ text: "Invalid password" });
            }

            // Generate a JSON Web Token for the user
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn });

            res.send({ token });
        } catch (error) {
            res.json({ message: error.message });
        }
    },
};

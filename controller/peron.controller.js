const Person = require("../model/DataPerson");
const admin = require("firebase-admin");
module.exports = {
    DataPerson: async (req, res, next) => {
        try {
            res.status(200).json(await Person.find());
        } catch (error) {
            res.status(500).json(error);
        }
    },
    DataPersonById: async (req, res, next) => {
        try {
            const { id } = req.params;
            res.status(200).json(await Person.findById(id));
        } catch (error) {
            res.status(500).json(error);
        }
    },
    DeletePerson: async (req, res, next) => {
        try {
            const { id } = req.params;
            const bucket = admin.storage().bucket();
            const find = await Person.find({ _id: id });
            const filePath = find[0].Operating_Manual.split("/").slice(-2).join("/");
            if (filePath) {
                const file = bucket.file(filePath);
                file.exists().then(async (exists) => {
                    if (exists) {
                        file.delete();
                        return res.status(200).json(await Person.findByIdAndDelete(id));
                    } else {
                        return res.status(200).json(await Person.findByIdAndDelete(id));
                    }
                });
            } else {
                return res.status(200).json(await Person.findByIdAndDelete(id));
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    UpdatePerson: async (req, res, next) => {
        try {
            console.log("UpdatePerson");
            const bucket = admin.storage().bucket();
            let pdf = "";
            if (req.file) {
                pdf = req.file.firebaseUrl;
            } else {
                pdf = "";
            }
            const { id } = req.params;
            const { First_name, Last_name, Gender, JobTitle, Department, Email, Phone, Profile, Position } = req.body;
            const find = await Person.findById(id);
            if (find.Operating_Manual === "") {
                console.log("data base not pdf file");
                if (pdf === "") {
                    console.log("you not upload pdf");
                    const data = {
                        First_name: First_name,
                        Last_name: Last_name,
                        Gender: Gender,
                        Job_title: JobTitle,
                        Department: Department,
                        Email: Email,
                        Phone: Phone,
                        Operating_Manual: "",
                        Profile: Profile,
                        Positions: Position,
                    };
                    let update = await Person.findByIdAndUpdate(id, data, { new: true });
                    return res.status(200).json(update);
                } else {
                    console.log("you will upload pdf");
                    console.log(pdf);
                    const filePath = find.Operating_Manual.split("/").slice(-2).join("/");
                    if (filePath) {
                        console.log("firebase has file");
                        const file = bucket.file(filePath);
                        file.exists().then(async (exists) => {
                            if (exists) {
                                console.log("exist");
                                file.delete();
                                const data = {
                                    First_name: First_name,
                                    Last_name: Last_name,
                                    Gender: Gender,
                                    Job_title: JobTitle,
                                    Department: Department,
                                    Email: Email,
                                    Phone: Phone,
                                    Operating_Manual: pdf,
                                    Profile: Profile,
                                    Positions: Position,
                                };
                                let update = await Person.findByIdAndUpdate(id, data, { new: true });
                                return res.status(200).json(update);
                            }
                        });
                    } else {
                        const data = {
                            First_name: First_name,
                            Last_name: Last_name,
                            Gender: Gender,
                            Job_title: JobTitle,
                            Department: Department,
                            Email: Email,
                            Phone: Phone,
                            Operating_Manual: pdf,
                            Profile: Profile,
                            Positions: Position,
                        };
                        let update = await Person.findByIdAndUpdate(id, data, { new: true });
                        return res.status(200).json(update);
                    }
                }
            } else {
                if (pdf) {
                    const filePath = find.Operating_Manual.split("/").slice(-2).join("/");
                    console.log("firebase has file");
                    const file = bucket.file(filePath);
                    file.exists().then(async (exists) => {
                        if (exists) {
                            console.log("exist");
                            file.delete();
                            const data = {
                                First_name: First_name,
                                Last_name: Last_name,
                                Gender: Gender,
                                Job_title: JobTitle,
                                Department: Department,
                                Email: Email,
                                Phone: Phone,
                                Operating_Manual: pdf,
                                Profile: Profile,
                                Positions: Position,
                            };
                            let update = await Person.findByIdAndUpdate(id, data, { new: true });
                            return res.status(200).json(update);
                        }
                    });
                } else {
                    const data = {
                        First_name: First_name,
                        Last_name: Last_name,
                        Gender: Gender,
                        Job_title: JobTitle,
                        Department: Department,
                        Email: Email,
                        Phone: Phone,
                        Operating_Manual: pdf,
                        Profile: Profile,
                        Positions: Position,
                    };
                    let update = await Person.findByIdAndUpdate(id, data, { new: true });
                    return res.status(200).json(update);
                }
            }
        } catch (error) {
            /* return res.status(500).json(error.message);*/
        }
    },
    CreatePerson: async (req, res, next) => {
        try {
            const { firebaseUrl } = req.file ? req.file : "";
            const { First_name, Last_name, Gender, JobTitle, Department, Email, Phone, Profile, Position } = req.body;
            if (firebaseUrl) {
                const data = {
                    First_name: First_name,
                    Last_name: Last_name,
                    Gender: Gender,
                    Job_title: JobTitle,
                    Department: Department,
                    Email: Email,
                    Phone: Phone,
                    Operating_Manual: firebaseUrl,
                    Profile: Profile,
                    Positions: Position,
                };
                let person = new Person(data);
                await person.save(async (err, data) => {
                    if (err) return res.status(400).json("Bad Request");
                    return res.status(200).json(data);
                });
            } else {
                const data = {
                    First_name: First_name,
                    Last_name: Last_name,
                    Gender: Gender,
                    Job_title: JobTitle,
                    Department: Department,
                    Email: Email,
                    Phone: Phone,
                    Operating_Manual: "",
                    Profile: Profile,
                    Positions: Position,
                };
                let person = new Person(data);
                await person.save(async (err, data) => {
                    if (err) return res.status(400).json("Bad Request");
                    return res.status(200).json(data);
                });
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
};

const DataEachYear = require("../model/DataStudentEachYear");
const admin = require("firebase-admin");

module.exports = {
    /*-----------------------Find----------------------------*/
    FindDataEachYear: async (req, res, next) => {
        try {
            return res.status(200).json(await DataEachYear.find());
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    FindDataEachYearById: async (req, res, next) => {
        try {
            const { id } = req.params;
            return res.status(200).json(await DataEachYear.findById(id));
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    FindDataEachYearByDate: async (req, res, next) => {
        try {
            const { param1, param2 } = req.params;
            const find = await DataEachYear.find({ "data.date._id": param2 }); // หาข้อมูลว่าอยู่ในไหน เเล้ว ต่อไปก็เจาะลึกลงมาโดยใช่ Filtter
            const data = find[0].data.filter(function (A) {
                return A._id.toString() === param1; // id ขอข้อมูลที่จะเอา เช่น DMC , ครู
            });
            const date = data[0].date.filter(function (B) {
                return B._id.toString() === param2; // id ของวันที่ที่จะเอาข้อมูล (Date)
            });
            return res.status(200).json(date);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    FindDataInGroupOfData: async (req, res, next) => {
        try {
            const { param1, param2 } = req.params;
            const find = await DataEachYear.find({ _id: param1 });
            const filteredData = find[0].data.filter((item) => item._id.toString() === param2);
            return res.status(200).json(filteredData);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    /*-----------------------Update----------------------------*/
    UpdateData: async (req, res, next) => {
        try {
            const { param, param2, param3 } = req.params;
            let csv = "";
            let pdf = "";
            if (req.files.csv) {
                csv = req.files.csv[0].firebaseUrl;
            } else {
                csv = "";
            }
            if (req.files.pdf) {
                pdf = req.files.pdf[0].firebaseUrl;
            } else {
                pdf = "";
            }

            switch (true) {
                case pdf === "" && csv === "":
                    return res.status(200).json(
                        await DataEachYear.updateOne(
                            { _id: param, "data.date._id": param3 },
                            {
                                $set: {
                                    "data.$[].date.$[].data.$[elem].name": req.body.name,
                                    "data.$[].date.$[].data.$[elem].url": req.body.url,
                                },
                            },
                            {
                                arrayFilters: [
                                    {
                                        "elem._id": param2,
                                    },
                                ],
                                multi: true,
                            }
                        )
                    );
                    break;
                case pdf !== "" && csv !== "":
                    return res.status(200).json(
                        await DataEachYear.updateOne(
                            { _id: param, "data.date._id": param3 },
                            {
                                $set: {
                                    "data.$[].date.$[].data.$[elem].name": req.body.name,
                                    "data.$[].date.$[].data.$[elem].url": req.body.url,
                                    "data.$[].date.$[].data.$[elem].csv": csv,
                                    "data.$[].date.$[].data.$[elem].pdf": pdf,
                                },
                            },
                            {
                                arrayFilters: [
                                    {
                                        "elem._id": param2,
                                    },
                                ],
                                multi: true,
                            }
                        )
                    );
                    break;
                case pdf !== "" && csv === "":
                    return res.status(200).json(
                        await DataEachYear.updateOne(
                            { _id: param, "data.date._id": param3 },
                            {
                                $set: {
                                    "data.$[].date.$[].data.$[elem].name": req.body.name,
                                    "data.$[].date.$[].data.$[elem].url": req.body.url,
                                    "data.$[].date.$[].data.$[elem].pdf": pdf,
                                },
                            },
                            {
                                arrayFilters: [
                                    {
                                        "elem._id": param2,
                                    },
                                ],
                                multi: true,
                            }
                        )
                    );
                    // handle this case
                    break;
                case pdf === "" && csv !== "":
                    return res.status(200).json(
                        await DataEachYear.updateOne(
                            { _id: param, "data.date._id": param3 },
                            {
                                $set: {
                                    "data.$[].date.$[].data.$[elem].name": req.body.name,
                                    "data.$[].date.$[].data.$[elem].url": req.body.url,
                                    "data.$[].date.$[].data.$[elem].csv": csv,
                                },
                            },
                            {
                                arrayFilters: [
                                    {
                                        "elem._id": param2,
                                    },
                                ],
                                multi: true,
                            }
                        )
                    );
                    break;
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    /*-----------------------Delete----------------------------*/
    DeleteData: async (req, res, next) => {
        try {
            const { param1, param2, param3, id } = req.params;

            const find = await DataEachYear.find({ _id: param1 });
            const filteredData = find[0].data.filter((item) => item._id.toString() === param2);
            const data = filteredData[0].date.filter((item) => item._id.toString() === param3);
            const Results = data[0].data.find((item) => item._id.toString() === id);
            const bucket = admin.storage().bucket();
            if (!Results.csv && !Results.pdf) {
                return res.status(200).json(
                    await DataEachYear.updateOne(
                        { _id: param1 },
                        {
                            $pull: { "data.$[].date.$[].data": { _id: id } },
                        },
                        { safe: true }
                    )
                );
            } else if (Results.pdf === "") {
                // ไม่มี pdf เเต่มี CSV
                const filePath = Results.csv.split("/").slice(-2).join("/");
                const csv = bucket.file(filePath);
                csv.exists().then(async (exists) => {
                    if (exists) {
                        csv.delete();
                        return res.status(200).json(
                            await DataEachYear.updateOne(
                                { _id: param1 },
                                {
                                    $pull: { "data.$[].date.$[].data": { _id: id } },
                                },
                                { safe: true }
                            )
                        );
                    } else {
                        console.log("File does not exist");
                    }
                });
            } else if (Results.csv === "") {
                // ไม่มี csv เเต่มี PDF
                const filePath = Results.pdf.split("/").slice(-2).join("/");
                const pdf = bucket.file(filePath);
                pdf.exists().then(async (exists) => {
                    if (exists) {
                        console.log("PDF exists");
                        pdf.delete();
                        return res.status(200).json(
                            await DataEachYear.updateOne(
                                { _id: param1 },
                                {
                                    $pull: { "data.$[].date.$[].data": { _id: id } },
                                },
                                { safe: true }
                            )
                        );
                    } else {
                        console.log("File does not exist");
                    }
                });
            } else {
           
                const csv = bucket.file(Results.csv.split("/").slice(-2).join("/"))
                const pdf = bucket.file(Results.pdf.split("/").slice(-2).join("/"))
                csv.exists().then(async (exists) => {
                    if (exists) {
                        csv.delete();
                        pdf.exists().then(async (exists) => {
                            if (exists) {
                                pdf.delete();
                                return res.status(200).json(
                                    await DataEachYear.updateOne(
                                        { _id: param1 },
                                        {
                                            $pull: { "data.$[].date.$[].data": { _id: id } },
                                        },
                                        { safe: true }
                                    )
                                );
                            } else {
                                console.log("FilePDF does not exist");
                            }
                        });
                    }
                });
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    DeleteDataDate: async (req, res, next) => {
        try {
            const { param1, id } = req.params;
            console.log(param1, id);
            return res.status(200).json(
                await DataEachYear.updateOne(
                    { _id: param1 },
                    {
                        $pull: { "data.$[].date": { _id: id } },
                    },
                    { safe: true }
                )
            );
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    DeleteDataRecordDate: async (req, res, next) => {
        try {
            const { param1, id } = req.params;
            return res.status(200).json(
                await DataEachYear.updateOne(
                    { _id: param1 },
                    {
                        $pull: { data: { _id: id } },
                    },
                    { safe: true }
                )
            );
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    DeleteDataYear: async (req, res, next) => {
        try {
            try {
                const { id } = req.params;
                await DataEachYear.findByIdAndDelete(id);
                return res.status(200).json(await DataEachYear.find());
            } catch (error) {
                return res.status(500).json(error.message);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    /*-----------------------Create----------------------------*/
    CreateDataYear: async (req, res, next) => {
        try {
            try {
                const data = req.body;
                let SaveData = new DataEachYear(data);
                await SaveData.save(async (err, data) => {
                    if (err) return res.status(400).json("Bad Request");
                    return res.status(200).json(data);
                });
            } catch (error) {
                return res.status(500).json(error.message);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    CreateDataName: async (req, res, next) => {
        try {
            try {
                const { param } = req.params;
                const data = req.body;
                return res.status(200).json(
                    await DataEachYear.updateOne(
                        { _id: param },
                        {
                            $push: { data },
                        },
                        { safe: true }
                    )
                );
            } catch (error) {
                return res.status(500).json(error.message);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    CreateDate: async (req, res, next) => {
        try {
            try {
                const { param, param2 } = req.params;
                const data = req.body;
                return res.status(200).json(
                    await DataEachYear.updateOne(
                        { _id: param, "data._id": param2 }, // สร้าง เวลา
                        {
                            $push: { "data.$.date": { name_date: req.body.name_date, icon: req.body.icon, data: [] } },
                        }
                    )
                );
            } catch (error) {
                return res.status(500).json(error.message);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    CreateData: async function (req, res, next) {
        try {
            try {
                let csv = "";
                let pdf = "";
                if (req.files.csv) {
                    csv = req.files.csv[0].firebaseUrl;
                } else {
                    csv = "";
                }
                if (req.files.pdf) {
                    pdf = req.files.pdf[0].firebaseUrl;
                } else {
                    pdf = "";
                }

                const { param, param2, param3 } = req.params;
                const { name, url } = req.body;
                return res.status(200).json(
                    await DataEachYear.updateOne(
                        { _id: param, "data.date._id": param3 },
                        {
                            $push: {
                                "data.$.date.$[elem].data": {
                                    name: name,
                                    url: url,
                                    csv: csv,
                                    pdf: pdf,
                                },
                            },
                        },
                        {
                            arrayFilters: [
                                {
                                    "elem._id": param3,
                                },
                            ],
                            multi: true,
                        }
                    )
                );
            } catch (error) {
                return res.status(500).json(error.message);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
};

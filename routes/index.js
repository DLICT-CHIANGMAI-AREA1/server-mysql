const router = require("express").Router();
const opm = require("./opm");
const DataEachYear = require("./DataEacahYear")
const Person = require("./Person");
const Video = require("./Video")
const Mission = require("./Mission")
const Service = require("./Service")
const News = require("./News")
const auth = require("./auth")
const website = require("./website")

router.use("/admin", opm);
router.use("/admin", DataEachYear);
router.use("/admin", Person);
router.use("/admin", Video);
router.use("/admin", Mission);
router.use("/admin", Service);
router.use("/admin", News);
router.use("/admin", auth);
router.use("/admin", website);




module.exports = router;
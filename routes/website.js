const router = require("express").Router();
const {
    AddFooter,
    editFooter,
    findFooter,
    AddLink,
    GetLink,
    EditLink,
    AddTitleBanner,
    EditTitleBanner,
} = require("../controller/website.controller");

router.post("/api/website/AddFooter", AddFooter);

router.get("/api/website/findFooter", findFooter);

router.put("/api/website/editFooter/:Id", editFooter);

router.post("/api/website/AddLink", AddLink);

router.get("/api/website/GetLink", GetLink);

router.put("/api/website/EditLink/:Id", EditLink);

router.post("/api/website/AddTitleBanner", AddTitleBanner);

router.put("/api/website/EditTitleBanner/:Id", EditTitleBanner);

module.exports = router;

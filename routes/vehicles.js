const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const DIR = "./uploads/";

const { JWT } = require("../middlewares/jwtAuth");
const Vehicle = require("../mongoose/vehicles");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, uuidv4() + "-" + fileName);
    },
});
var upload = multer({
    storage: storage,
});

router.post("/register", JWT, upload.array("file", 10), async (req, res) => {
    try {
        const { city, modal, phone_no, price } = req.body;
        const { _id } = req.token;
        let CreateVehicle = new Vehicle({
            city,
            modal,
            phone_no,
            price,
            pictures: req.files?.map(e => e.filename),
            user_id: _id,
        });
        let data = await CreateVehicle.save();
        res.json(data);
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
});
router.get("/files/:fileId", (req, res) => {
    const fileId = req.params.fileId;

    const filePath = path.join(__dirname, "..", "uploads", fileId);
    // res.setHeader("Content-Type", "application/pdf");

    res.sendFile(filePath);
});
router.get("/getList", JWT, async (req, res) => {
    try {
        const { _id } = req.token;
        let list = await Vehicle.find({ user_id: _id });
        res.json(list);
    } catch (error) {
        res.status(400).json(error.message);
    }
});
module.exports = router;

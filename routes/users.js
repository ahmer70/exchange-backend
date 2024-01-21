const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT } = require("../middlewares/jwtAuth");
const User = require("../mongoose/users");


router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        let pass = await bcrypt.hash(password, 10);
        let CreateUser = new User({
            email: email,
            password: pass,

        })
        let user = await CreateUser.save();
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
});


router.get("/getUser", JWT, async (req, res) => {
    try {
        const { _id } = req.token;
        let user = await User.findOne({ _id });
        res.json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
});
router.get("/", async (req, res) => {
    try {
       
        res.json({user:"hello user"});
    } catch (error) {
        res.status(400).json(error.message);
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        let user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const passwordBd = user.password;
        const isPassword = await bcrypt.compare(password, passwordBd);
        if (!isPassword) throw new Error("Invalid Password");
        let token = jwt.sign(
            { _id: user.id },
            "test_salt"
        );

        res.status(200).json({
            token,
            user,
        });
    } catch (error) {
        console.log(error.message);
        res.status(403).json({ error: error.message });
    }
});






module.exports = router;

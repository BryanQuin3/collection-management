const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const secretKey = process.env.JWT_SECRET_KEY;

module.exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.login = async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user === null) {
        return res.sendStatus(404).json({ message: "User not found" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
        return res.sendStatus(400).json({ message: "Invalid credentials" });
    }
    const userToken = jwt.sign({
        id: user._id
    }, secretKey, { expiresIn: "1h" });
    return res.cookie("usertoken", userToken, { httpOnly: true }).status(200)
        .json({ message: "Logged ok",usertoken: userToken});
    } catch (error) {
        console.log("Error in login " + error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports.cookie = async (req, res) => {
    try {
        return res.cookie("usertoken", "myData", { httpOnly: true })
            .json({ message: "ok" });
    } catch (error) {
        return res.json(error);
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie("usertoken");
        return res.status(200).json({ message: "Loggout successful" });
    } catch (error) {
        return res.json({ message: "Server error"});
    }
}

module.exports.checkAuth = async (req, res) => {
    try {
        console.log("Checking auth");
        console.log(req.cookies.usertoken);
        const decoded = jwt.verify(req.cookies.usertoken, secretKey);
        const user = await User.findById(decoded.id);
        if (user) {
            return res.status(200).json({ message: "Valid token" });
        }
        return res.status(401).json({ message: "User not found" });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
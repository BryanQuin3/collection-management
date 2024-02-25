const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const secretKey = process.env.JWT_SECRET_KEY ;

function generateToken (user) {
    const ONE_HOUR = 3600000;
    const expirationTime = new Date(Date.now() + ONE_HOUR);
    const expirationTimeInSeconds = Math.floor((expirationTime.getTime() - Date.now()) / 1000);
    const userToken = jwt.sign({
        id: user._id
    }, secretKey, { expiresIn: expirationTimeInSeconds });
    return { userToken, expirationTime };
}

module.exports.createUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email : req.body.email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const newUser = await User.create(req.body);
        const { userToken, expirationTime } = generateToken(newUser);
        
        return res.cookie("usertoken", userToken, {
            httpOnly: true,
            expires: expirationTime
        }).status(200).json({ 
            message: "User created", 
            usertoken: userToken, 
            expirationTime: expirationTime.getTime() 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
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
        return res.status(404).json({ message: "User not found" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const { userToken, expirationTime } = generateToken(user);

     return res.cookie("usertoken", userToken, { 
         httpOnly: true, 
         expires: expirationTime
     }).status(200).json({ 
         message: "Logged ok",
         usertoken: userToken,
         expirationTime: expirationTime.getTime()
     });
    } catch (error) {
        console.log(`Error: ${error}`);
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
        const decoded = jwt.verify(req.cookies.usertoken, secretKey);
        const user = await User.findById(decoded.id);
        if (user) {
            return res.status(200).json({ message: "Valid token",valid : true});
        }
        return res.status(401).json({ message: "User not found", valid: false});
    } catch (error) {
        return res.status(401).json({ message: error.message , valid: false});
    }
}
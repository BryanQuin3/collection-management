const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Name is required"]
    },
    email : {
        type: String,
        required: [true, "Email is required"],
        validate : {
            validator : val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            message : "Please enter a valid email"
        }
    },
    password :{
        type : String,
        required : [true,"Password is required"],
        min : [8,"Password must be at least 8 characters long"],
        validate : {
            validator : val => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(val),
            message : "Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long"
        }
    }
},{timestamps:true});

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model("User",UserSchema);

module.exports = User;
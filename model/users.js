const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: {
        type: String,
        unique: true,
        required: [true, "Please Provide Password"],
        maxlength: [8, "Please Provide Password withnin 8 length"]
    },
    email: {
        type: String,
        unique: [true, "Please Provide Email"]
    },
    slat: String,
    gender: {
        type: String,
        enum: ["Male", "Female"]
    }, role: {
        type: String,
        default: "Basic",
        required: true,
    }
}, { timestamps: true })

//Saving Encrypt Password
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//Checking Password

UserSchema.methods.matchPassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)
}
// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const User = mongoose.model("user", UserSchema)


module.exports = User;
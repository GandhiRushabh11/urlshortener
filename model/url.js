
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    shortid: {
        type: String,
        unique: true,
        required: true,
    }, createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    visitHistory: [{ timestamp: { type: Number } }]

}, { timestamps: true });

const Url = mongoose.model('url', urlSchema)

module.exports = Url

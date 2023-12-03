const mongoose = require('mongoose');

async function ConnectDB(dbUrl) {
    const conn = await mongoose.connect(dbUrl);
    console.log(`MongoDB Connected :${conn.connection.host}`)
}

module.exports = ConnectDB
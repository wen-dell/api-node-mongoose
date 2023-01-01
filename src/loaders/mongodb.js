const mongoose = require('mongoose');

async function startDB() {
    await mongoose.connect('mongodb://localhost:27017');
}

module.exports = startDB;
// To establish the connection between server and DB.
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/track_bills', {serverSelectionTimeoutMS: 5000,useNewUrlParser: true,useUnifiedTopology: true});

// On error
db.on('error', () => {
    console.log('Connection Error')
});

// On success
db.once('open', () => {
    console.log('Connected to MongoDB!!!!!!');
});
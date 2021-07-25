// mongo Schema for the users collection
const mongoose = require('mongoose');

const schema_obj = mongoose.Schema({
    email_id:String,
    name:{ 
        first:String, 
        last:String
    },
    password:String,
    session_id:String,
    user_name:String,
});

module.exports.userSchema = mongoose.model('users', schema_obj);

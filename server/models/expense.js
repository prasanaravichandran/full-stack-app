// mongo Schema for the expenses collection
const mongoose = require('mongoose');

const schema_obj = mongoose.Schema({
    user_name:String,
    title: String,
    description:String,
    total_amount: Number,
    type:String,
    created_date: Date,
    expense_id: Number
});

module.exports.expenseSchema = mongoose.model('expenses', schema_obj);


    

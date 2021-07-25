// Schema for the graphQl 
const { buildSchema } = require('graphql');

const typeDefs = buildSchema(`
    scalar Date
    type nameDetails {
        first : String!
        last : String!
    }

    type userDetails {
        name : nameDetails
        user_token : String!
        email_id : String!
    }

    type getExpensesType {
        expense_id:Int,
        title: String,
        description:String,
        total_amount:Int,
        type:String,
        created_date: Date,
    }

    type amountSplitUpType {
        credit : Int,
        debit : Int
    }

    type getDateWiseExpenseType {
        _id : Date,
        split_up : amountSplitUpType
    }

    type addExpenseType {
        statusCode: Int
        message: String
    }

    type updateExpenseType {
        statusCode: Int
        message: String
    }

    type deleteExpenseType {
        statusCode: Int
        message: String
    }

    type Query {
        userLogIn(user_name : String, password : String ) : userDetails
        getExpenses : [getExpensesType]
        getDateWiseExpense : [getDateWiseExpenseType]
    }

    type Mutation {
        addExpense(title: String, description: String, total_amount: Int,  type: String,  created_date: Date, expense_id: Int): addExpenseType
        updateExpense(title: String, description: String, total_amount: Int,  type: String,  created_date: Date, expense_id: Int): updateExpenseType
        deleteExpense(expense_id: Int) : deleteExpenseType
    }

`);

module.exports = typeDefs;
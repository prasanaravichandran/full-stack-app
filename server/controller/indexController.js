// Index page for the controller
module.exports = {
    'userLogIn' : require('./logIn/logIn'),
    'getExpenses' : require('./expense/expense').getExpenses,
    'getDateWiseExpense' : require('./expense/expense').getDateWiseExpense,
    'addExpense' : require('./expense/expense').addExpense,
    'updateExpense' : require('./expense/expense').updateExpense,
    'deleteExpense' : require('./expense/expense').deleteExpense
}
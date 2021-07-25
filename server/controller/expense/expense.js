/**
 * Expense controller
 * 1. Get 
 * 2. Delete
 * 3. Add
 * 4. Update
 * 5. Get Daily split up data
 */
const { expenseSchema } = require('../../models/expense');

module.exports.getExpenses = ({},context) => new Promise((resolve, reject) => {
    expenseSchema.find({'user_name': `${context.user_name}`})
    .then((response) => {
        resolve(response);
    })
    .catch((e) => {
        reject(new Error('INTERNAL_SERVER_ERROR'));
    })
})


module.exports.getDateWiseExpense = ({userName},context) => new Promise((resolve, reject) => {
    expenseSchema.aggregate([
        {
          '$match': {
            'user_name': context.user_name
          }
        }, {
            '$group': {
              '_id': {
                'date': {
                  '$dateToString': {
                    'format': '%Y-%m-%d', 
                    'date': '$created_date'
                  }
                }, 
                'amount_type': '$type'
              }, 
              'sum': {
                '$sum': '$total_amount'
              }
            }
          }, {
          '$group': {
            '_id': '$_id.date', 
            'split_up': {
              '$push': {
                'type': '$_id.amount_type', 
                'amount': '$sum'
              }
            }
          }
        }, {
          '$project': {
            'split_up': {
              '$arrayToObject': {
                '$map': {
                  'input': '$split_up', 
                  'as': 'data', 
                  'in': {
                    'k': '$$data.type', 
                    'v': '$$data.amount'
                  }
                }
              }
            }
          }
        }, {
          '$sort': {
            '_id': 1
          }
        }
    ])
    .then((response) => {
        resolve(response);
    })
    .catch((e) => {
        reject(new Error('INTERNAL_SERVER_ERROR'));
    });
})


module.exports.addExpense = (data,context) => new Promise((resolve, reject) => {
  console.log('context : ', context);
  data.user_name = context.user_name;
  let insertData = new expenseSchema(data);
  insertData.save()
  .then((response) => {
      resolve({statusCode:200, message: 'Expense Added'});
  })
  .catch((e) => {
      console.log(e);
      reject(new Error('INTERNAL_SERVER_ERROR'));
  })  
})


module.exports.updateExpense = (data,context) => new Promise((resolve, reject) => {
  data.user_name = context.user_name;
  expenseSchema.findOne({ 'user_name' : context.user_name, 'expense_id' : data.expense_id })
  .then((particularExpense) => {
    let updateExpense = particularExpense.set(data);
    updateExpense.save()
    .then((response) => {
      resolve({statusCode:200, message: 'Expense Updated'});
    })
    .catch((e) => {
        reject(new Error('INTERNAL_SERVER_ERROR'));
    }) 
  })
  .catch((e) => {
      reject(new Error('INTERNAL_SERVER_ERROR'));
  })  
})


module.exports.deleteExpense = (data,context) => new Promise((resolve, reject) => {
  data.user_name = context.user_name;
  expenseSchema.deleteOne({ 'user_name' : context.user_name, 'expense_id' : data.expense_id })
  .then((response) => {
    resolve({statusCode:200, message: 'Expense Deleted'});
  })
  .catch((e) => {
      reject(new Error('INTERNAL_SERVER_ERROR'));
  })  
})
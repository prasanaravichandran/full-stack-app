// GraphQl Mutation type
import { gql } from "@apollo/client";

// To add the expense in the DB
export const ADD_EXPENSE = gql`
  mutation AddExpense($title: String, $description: String, $total_amount: Int,  $type: String,  $created_date: Date, $expense_id: Int) {
    addExpense(title: $title, description: $description, total_amount: $total_amount, type: $type, created_date: $created_date, expense_id: $expense_id) {
        statusCode
        message
    }
  }
`;

// To update the expense in the DB
export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($title: String, $description: String, $total_amount: Int,  $type: String,  $created_date: Date, $expense_id: Int) {
    updateExpense(title: $title, description: $description, total_amount: $total_amount, type: $type, created_date: $created_date, expense_id: $expense_id) {
        statusCode
        message
    }
  }
`;

// To delete the expense in the DB
export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($expense_id: Int) {
    deleteExpense(expense_id: $expense_id) {
        statusCode
        message
    }
  }
`;
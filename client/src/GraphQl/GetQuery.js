// GraphQl query type
import { gql } from "@apollo/client";

// To authenticate the user
export const LOG_IN = gql`
    query UserLogIn ($userName: String, $password: String) { 
        userLogIn(user_name: $userName, password: $password) {
            name {
                first
                last
            }
            user_token
            email_id
        }
    }
`;

// Get the list of expenses
export const GET_EXPENSES = gql`
    query GetExpenses {
        getExpenses {
            title,
            description,
            total_amount,
            type,
            created_date,
            expense_id
        },
        getDateWiseExpense {
            _id,
            split_up {
                credit,
                debit
            }
        }
    }
`;


/**
 * To list the expenses in the expense page.
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../../Components/Components';
import moment from 'moment';
import './ListExpenseCard.scss';

const expenseType = {
    'debit' : 'text-danger',
    'credit' : 'text-success'
}

function ListExpenseCard (props) {
    return (
        <div className="listExpensesCard w-100">
            <ul className="list-group w-100">
            { (props.expenses.length) ? 
            props.expenses.map((expense) => 
                <li key={expense.expense_id.toString()} className="list-group-item">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-8">
                                <div className="row cardText h5">
                                    <b>{expense.title}</b>
                                </div>
                                <div className="row cardText">
                                    {expense.description}
                                </div>
                                <div className="row cardText">
                                    <span>Created at : </span>{moment(expense.created_date).format('MMM DD, YYYY')}
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="row justify-content-end">
                                    <div className={`h3 amount mb-0 ${expenseType[expense.type]}`}>
                                        {expense.total_amount}
                                    </div>
                                </div>
                                <div className="row justify-content-end mt-2">
                                    <Button id={`update-${expense.expense_id}`} type="button" onClick={props.updateClick} className="btn-outline-info btn-sm" name={<FontAwesomeIcon icon="pen" size="xs"/>}/>
                                    <Button id={`delete-${expense.expense_id}`} type="button" onClick={props.deleteClick} className="btn-outline-danger btn-sm ml-3" name={<FontAwesomeIcon icon="trash" size="xs"/>}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            ) : 
            <div className="display-4 text-secondary">Add Expense</div>
            }
            </ul>
        </div>
    );
}

export default ListExpenseCard;
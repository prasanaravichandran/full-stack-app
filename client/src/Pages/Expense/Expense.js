/**
 * Expense Component. After login this component will render.
 */
import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { useQuery, useMutation } from "@apollo/client";
import moment from 'moment';
import { Body, Header } from '../../Parts/Parts';
import { Card, Input, Button, PageLoader, ErrorPage } from '../../Components/Components';
import ExpenseChart from './DailyExpenseChart/ExpenseChart';
import ListExpenseCard from './ListExpenseCard/ListExpenseCard';
import { GET_EXPENSES } from '../../GraphQl/GetQuery';
import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../../GraphQl/MutationQuery';
import { GetSessionData } from '../../Service/SessionStorage';
import './Expense.scss';

const expenseFormValidate = Object.freeze({
    title : "",
    description : "",
    total_amount : "",
    type : ""
});

function ExpensePage() {
    // Query hook to get the data from GraphQl server
    const { loading: getExpensesLoading, error: getExpensesError, data, refetch } = useQuery(GET_EXPENSES,{ errorPolicy: 'all' });
    // Mutation query to post the data to graphQl server
    const [addExpense, { loading: addExpenseLoading, error: addExpenseError }] = useMutation(ADD_EXPENSE);
    const [updateExpense, { loading: updateExpenseLoading, error: updateExpenseError }] = useMutation(UPDATE_EXPENSE);
    const [deleteExpense, { loading: deleteExpenseLoading, error: deleteExpenseError }] = useMutation(DELETE_EXPENSE);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expenseFormData, updateExpenseFormData] = useState(expenseFormValidate);
    const [modalType, setmodalType] = useState();
    
    const sessionToken = GetSessionData("sessionToken") || false;

    if (!sessionToken) return <ErrorPage code="401" text="User Not Authenticated"/>;
    if (getExpensesError)    return <ErrorPage code="500" text="Something went wrong"/>;
    if (getExpensesLoading || addExpenseLoading || updateExpenseLoading || deleteExpenseLoading)  return <PageLoader/>;

    // Calculate total debited and credited amount.
    const totalCreditedAmount = data.getExpenses.filter(({type}) => type === 'credit').reduce((sum, record) => sum + record.total_amount, 0);
    const totalDebitedAmount = data.getExpenses.filter(({type}) => type === 'debit').reduce((sum, record) => sum + record.total_amount, 0);
    
    // Shows the model box based on the type.
    const showModal = (e) => {
        if (e.currentTarget.id) {
            let id = e.currentTarget.id.split('-');
            if (id[0] === 'update') {
                setmodalType('Update');
                let updateData = data.getExpenses.find(({expense_id}) => expense_id === Number(id[1]));
                updateExpenseFormData(updateData);
            } else if (id[0] === 'delete') {
                setmodalType('Delete');
                let updateData = data.getExpenses.find(({expense_id}) => expense_id === Number(id[1]));
                updateExpenseFormData(updateData);
            }
        } else {
            setmodalType('Add');
        }
        setIsModalOpen(true);
    };

    // Hide the modal box
    const hideModal = () => {
        setIsModalOpen(false);
        updateExpenseFormData({expenseFormValidate});
    };

    // onchange event for the expense modal box
    const handleExpenseFormDataChange = (e) => {
        updateExpenseFormData({
        ...expenseFormData,
        [e.target.name]: e.target.value.trim() || '-'
        });
    };

    // Delete the expense from the list
    const deleteParticularExpense = (e) => {
        e.preventDefault();
        deleteExpense({ variables: {'expense_id' : Number(e.currentTarget.id)} }).then(
            res => refetch(),
            err => console.log(err)
        );
        hideModal();
    }

    // Save the expense data
    const saveExpense = (e) => {
        e.preventDefault();
        let expenseData = expenseFormData;
        if (expenseData.expense_id) {
            expenseData.total_amount = Number(expenseData.total_amount);
            updateExpense({ variables: expenseData }).then(
                res => refetch(),
                err => console.log(err)
            );
        } else {
            expenseData.created_date = new Date().toISOString();
            expenseData.expense_id = moment().unix();
            expenseData.total_amount = Number(expenseFormData.total_amount);
            addExpense({ variables: expenseData }).then(
                res => refetch(),
                err => console.log(err)
            );
        }
        hideModal();
    };


    return (
        <div className="expensePage h-100">
            <Header page="expense"/>
            <Body className="pt-lg-0 pt-md-0 pt-sm-0 pt-3 mb-5">
                <div className="col-lg-7 col-md-12 col-sm-12 col-12 mb-5">
                    <div className="container-fluid bg-white">
                        <div className="row">
                            <div className="container-fluid">
                                <div className="row p-3 justify-content-between">
                                    <div className="my-auto h6">
                                        No of Expenses : {(data && data.getExpenses) ? data.getExpenses.length : 0}
                                    </div>
                                    <Button type="submit" onClick={showModal} className="btn-sm btn-outline-primary" name="+ Add Expense"/>
                                </div>
                            </div>
                        </div>
                        <div className="row expensesListContainer">
                            <div className="container-fluid ">
                                <div className={`row p-3 ${(data.getExpenses === undefined) ? 'emptyListText' : ''}`}>
                                    <ListExpenseCard updateClick={showModal} deleteClick={showModal} expenses={data && data.getExpenses}/>
                                </div>
                            </div>
                        </div>
                        <div className="row p-2"></div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 col-12 mb-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                <Card title="Total Credited Amount">
                                    <div className="h1 text-success creditAmount">{totalCreditedAmount}</div>
                                </Card>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-sm-0 mt-3">
                                <Card title="Total Debited Amount">
                                    <div className="h1 text-danger debitAmount">{totalDebitedAmount}</div>
                                </Card>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-sm-0 mt-3">
                                <Card title="Daily Split Up">
                                    <ExpenseChart data={data && data.getDateWiseExpense}/>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </Body>
            <Modal show={isModalOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>
                        {modalType} Expense
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { (modalType === 'Delete') ? 
                        <div>
                            Are you sure want to delete ?
                        </div>
                        :
                        <form className="font-weight-bold">
                            <div className="form-group">
                                <Input type="text" label="Title" name="title" onChange={handleExpenseFormDataChange} value={expenseFormData.title} labelClassName="float-left" className="form-control" placeholder="Title" />
                            </div>
                            <div className="form-group">
                                <Input type="textarea" rows="2" label="Description" name="description" onChange={handleExpenseFormDataChange} value={expenseFormData.description} labelClassName="float-left" className="form-control" placeholder="Description" />
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-6">
                                        <Input type="number" placeholder="Amount" label="Amount" name="total_amount" onChange={handleExpenseFormDataChange} value={expenseFormData.total_amount} labelClassName="float-left" className="form-control"/>
                                    </div>
                                    <div className="col-6 m-auto justify-content-around">
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <Input type="radio" checked={`${(expenseFormData.type === 'credit') ? 'true' : ''}`} label="Credit" id="credit1" labelFor="credit1" name="type" onChange={handleExpenseFormDataChange} value="credit" labelClassName="custom-control-label" className="custom-control-input"/>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <Input type="radio" checked={`${(expenseFormData.type === 'debit') ? 'true' : ''}`} label="Debit" id="debit1" labelFor="debit1" name="type" onChange={handleExpenseFormDataChange} value="debit" labelClassName="custom-control-label" className="custom-control-input"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={hideModal} className="btn-outline-danger btn-sm" name="Cancel"/>
                    { (modalType === 'Delete') ? 
                        <Button type="submit" id={expenseFormData.expense_id} onClick={deleteParticularExpense} value="Submit" className="btn-outline-primary btn-sm" name="Delete"/>
                    :
                        <Button type="submit" onClick={saveExpense} value="Submit" className="btn-outline-primary btn-sm" name="Save"/>
                    }   
                </Modal.Footer>
            </Modal>
        </div>  
    );
}

export default ExpensePage;
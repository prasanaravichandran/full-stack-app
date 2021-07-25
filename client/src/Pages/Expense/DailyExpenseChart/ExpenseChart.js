/**
 * Daily Split up Chart component with uses bar chart to display the total amount
 * debited and credited at daily bases. 
 */
import { BarChart } from '../../../Components/Components';
import moment from 'moment';

function ExpenseChart (props) {

    let dateArray = [];
    let creditArray = [];
    let debitArray = [];
    props.data.forEach(element => {
        dateArray.push(moment(element._id).format('MMM DD, YY'));
        creditArray.push(element.split_up.credit || 0);
        debitArray.push(element.split_up.debit || 0);
    });

    const dataset = [
          {
            label: 'Credited',
            backgroundColor: '#6abb6e',
            borderColor: '#6abb6e',
            borderWidth: 2,
            data: creditArray
          },
          {
            label: 'Debited',
            backgroundColor: '#e4857e',
            borderColor: '#e4857e',
            borderWidth: 2,
            data: debitArray
          }
    ]

    return (
        <BarChart dataSet={dataset} xAxis={dateArray}/>
    )
}

export default ExpenseChart;
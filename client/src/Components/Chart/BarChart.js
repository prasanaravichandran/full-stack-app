/**
 * Bar Chart Component
 * Customizable chart
 */
import Bar from './ChartConfig';

function BarChart (props) {
    const dataset = props.dataSet;
    const xAxis = props.xAxis;
    const defaultOptions = {
        legend:{
            display:false,
            position:'right'
        },
    }
    const options = props.options || defaultOptions;
    return (
        <Bar
            data={{
                labels : xAxis,
                datasets : dataset
            }}
            options={{options}}/>
    )
}

export default BarChart;